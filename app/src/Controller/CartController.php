<?php

namespace App\Controller;

use App\DTO\CartDTO;
use App\DTO\UpdateUserDTO;
use App\Entity\Cart;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Entity\Product;
use App\Entity\User;
use App\Repository\CartRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/carts')]
class CartController extends AbstractController
{
    #[Route('', name: 'api_get_cart', methods: ['GET'], format: 'json')]
    public function cart(CartRepository $cartRepository): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $cartRepository->findOneBy(['owner' => $user]);

        return $this->json(
            $cart,
            context: [
                'groups' => [
                    'cart:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('/validate', name: 'app_validate_cart', methods: ['POST'])]
    public function validateCart(
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager,
        OrderRepository $orderRepository
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $cartRepository->findOneBy(['owner' => $user]);

        if ($cart->getProducts()->isEmpty()) {
            return $this->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        $order = $orderRepository->findOneBy(['owner' => $user, 'status' => 'pending']);

        if (!$order) {
            $order = new Order();
            $order->setOwner($user);
            $order->setStatus('pending');
            $order->setTotalPrice(0);

            $entityManager->persist($order);
            $entityManager->flush();
        }

        $total = 0;
        foreach ($cart->getProducts() as $orderProduct) {
            $total += $orderProduct->getBuyPrice() * $orderProduct->getQuantity();
            $orderProduct->setOrderId($order);
            $order->addProduct($orderProduct);

            $entityManager->persist($orderProduct);
        }

        $order->setTotalPrice($total);

        $entityManager->persist($order);
        $entityManager->flush();

        $cart->getProducts()->clear();

        $entityManager->persist($cart);
        $entityManager->flush();

        return $this->json(
            $order,
            context: [
                'groups' => [
                    'order:read',
                    'date:read'
                ]
            ]
        );
    }

    #[Route('/{id}', name: 'app_add_product_to_cart', methods: ['POST'], format: 'json')]
    public function addProductToCart(
        #[MapRequestPayload] CartDTO $cartDTO,
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager,
        Product $product
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        if (!$product->isActive()) {
            return $this->json([
                'message' => 'Product is not active'
            ], 400);
        }

        if ($product->getStock() < $cartDTO->getQuantity()) {
            return $this->json([
                'message' => 'Not enough quantity'
            ], 400);
        }

        $cart = $cartRepository->findOneBy(['owner' => $user]);
        if (!$cart) {
            $cart = new Cart();
            $cart->setOwner($user);

            $entityManager->persist($cart);
            $entityManager->flush();
        }
        $orderProduct = $cart->getProducts()->filter(function (OrderProduct $orderProduct) use ($product) {
            return $orderProduct->getProduct()->getId() === $product->getId();
        })->first();

        if ($orderProduct) {
            if ($product->getStock() < $orderProduct->getQuantity() + $cartDTO->getQuantity()) {
                return $this->json([
                    'message' => 'Not enough quantity'
                ], 400);
            }
            $orderProduct->setQuantity($orderProduct->getQuantity() + $cartDTO->getQuantity());
            $orderProduct->setBuyPrice($product->getPrice());

            $entityManager->persist($orderProduct);
            $entityManager->flush();

            return $this->json(
                $cart,
                context: [
                    'groups' => [
                        'cart:read',
                        'date:read',
                    ]
                ]
            );
        } else {
            if ($product->getStock() < $cartDTO->getQuantity()) {
                return $this->json([
                    'message' => 'Not enough quantity'
                ], 400);
            }
            $orderProduct = new OrderProduct();
            $orderProduct->setProduct($product);
            $orderProduct->setQuantity($cartDTO->getQuantity());
            $orderProduct->setBuyPrice($product->getPrice());
            $orderProduct->setCart($cart);

            $cart->addProduct($orderProduct);

            $entityManager->persist($orderProduct);
            $entityManager->flush();

            return $this->json(
                $cart,
                context: [
                    'groups' => [
                        'cart:read',
                        'date:read',
                    ]
                ]
            );
        }
    }

    #[Route('/{id}', name: 'app_update_cart', methods: ['PATCH'], format: 'json')]
    public function updateCart(
        #[MapRequestPayload] CartDTO $cartDTO,
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager,
        Product $product
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $cartRepository->findOneBy(['owner' => $user]);

        $orderProduct = $cart->getProducts()->filter(function (OrderProduct $orderProduct) use ($product) {
            return $orderProduct->getProduct()->getId() === $product->getId();
        })->first();

        if (!$orderProduct) {
            return $this->json(
                $cart,
                context: [
                    'groups' => [
                        'cart:read',
                        'date:read',
                    ]
                ]
            );
        }

        $orderProduct->setQuantity($cartDTO->getQuantity());
        $orderProduct->setBuyPrice($product->getPrice());

        $entityManager->persist($orderProduct);
        $entityManager->flush();

        return $this->json(
            $cart,
            context: [
                'groups' => [
                    'cart:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('/{id}', name: 'app_remove_product_from_cart', methods: ['DELETE'], format: 'json')]
    public function removeProductFromCart(
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager,
        Product $product
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $cartRepository->findOneBy(['owner' => $user]);

        $orderProduct = $cart->getProducts()->filter(function (OrderProduct $orderProduct) use ($product) {
            return $orderProduct->getProduct()->getId() === $product->getId();
        })->first();

        if (!$orderProduct) {
            return $this->json([
                'message' => 'Product not found in cart'
            ], 404);
        }

        $cart->removeProduct($orderProduct);

        $entityManager->remove($orderProduct);
        $entityManager->persist($cart);
        $entityManager->flush();

        return $this->json(
            $cart,
            context: [
                'groups' => [
                    'cart:read',
                    'date:read',
                ]
            ]
        );
    }
}

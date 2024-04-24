<?php

namespace App\Controller;

use App\DTO\CartDTO;
use App\DTO\UpdateUserDTO;
use App\Entity\OrderProduct;
use App\Entity\User;
use App\Repository\CartRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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

    #[Route('/{id}', name: 'app_add_product_to_cart', methods: ['POST'], format: 'json')]
    public function addProductToCart(
        #[MapRequestPayload] CartDTO $cartDTO,
        ProductRepository $productRepository,
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $product = $productRepository->findOneBy(['id' => $cartDTO->getProductId()]);

        $cart = $cartRepository->findOneBy(['owner' => $user]);
        $orderProduct = new OrderProduct();
        $orderProduct->setProduct($product);
        $orderProduct->setCart($cart);
        $orderProduct->setQuantity($cartDTO->getQuantity());
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

    #[Route('/{id}', name: 'app_update_cart', methods: ['PATCH'], format: 'json')]
    public function updateCart(
        #[MapRequestPayload] CartDTO $cartDTO,
        CartRepository $cartRepository,
        EntityManagerInterface $entityManager
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $cartRepository->findOneBy(['owner' => $user]);

        $orderProduct = $cart->getProducts()->filter(function (OrderProduct $orderProduct) use ($cartDTO) {
            return $orderProduct->getProduct()->getId() === $cartDTO->getProductId();
        })->first();

        $orderProduct->setQuantity($cartDTO->getQuantity());

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

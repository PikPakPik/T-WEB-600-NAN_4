<?php

namespace App\Controller;

use App\DTO\CartDTO;
use App\DTO\PaginationDTO;
use App\DTO\UpdateUserDTO;
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
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/orders')]
class OrderController extends AbstractController
{
    #[Route('', name: 'api_get_orders_user', methods: ['GET'], format: 'json')]
    public function cart(OrderRepository $orderRepository): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $cart = $orderRepository->findOneBy(['owner' => $user]);

        return $this->json(
            $cart,
            context: [
                'groups' => [
                    'order:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('/all', name: 'api_get_orders', methods: ['GET'], format: 'json')]
    public function getOrders(OrderRepository $orderRepository, #[MapQueryString] ?PaginationDTO $paginationDTO = new PaginationDTO()): Response
    {
        $orders = $orderRepository->getOrders($paginationDTO);

        return $this->json(
            $orders
        );
    }

    #[Route('/{id}', name: 'api_get_order', methods: ['GET'], format: 'json')]
    public function getOrder(Order $order): Response
    {
        $user = $this->getUser();
        if ($order->getOwner() !== $user) {
            return $this->json([
                'message' => 'Access denied'
            ], 403);
        }
        return $this->json(
            $order,
            context: [
                'groups' => [
                    'order:read',
                    'date:read',
                    'product:read',
                ]
            ]
        );
    }

    #[Route('/{id}/pay', name: 'pay_order', methods: ['GET'])]
    public function checkout(OrderRepository $orderRepository, int $id): Response
    {
        $stripe = new \Stripe\StripeClient('sk_test_51PDoapP1r89JaicVPOLtQQshmMJZIjDMI6zFUuYD7fEQnFq61kxLq2T5t4rIwEMa60hnkaGon9b2XUgDfvr0fnRQ00q9IFJ3TR');
        $order = $orderRepository->find($id);

        if (!$order) {
            return new Response('Order not found.', 404);
        }

        if ($order->getStatus() !== "pending") {
            return new Response('Order is already processed.', 400);
        }

        $productsToShowTOPayment = [];

        foreach ($order->getProducts() as $product) {
            if (count($productsToShowTOPayment) === 20) {
                break;
            }

            $productsToShowTOPayment[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product->getProduct()->getName(),
                    ],
                    'unit_amount' => round($product->getBuyPrice()),
                ],
                'quantity' => $product->getQuantity(),
            ];
        }

        $session = $stripe->checkout->sessions->create([
            'success_url' => 'http://localhost/success',
            'customer_email' => $this->getUser()->getEmail(),
            'line_items' => [
                $productsToShowTOPayment
            ],
            'mode' => 'payment',
        ]);

        return $this->json([
            'id' => $session->id,
            'url' => $session->url
        ]);
    }
}

<?php

namespace App\Controller;

use App\DTO\CartDTO;
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
}

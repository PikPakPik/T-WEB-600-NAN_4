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
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/stats')]
class StatisticsController extends AbstractController
{
    #[Route('', name: 'api_get_stats', methods: ['GET'], format: 'json')]
    public function stats(UserRepository $userRepository, OrderRepository $orderRepository, ProductRepository $productRepository): Response
    {
        $users = $userRepository->findAll();
        $orders = $orderRepository->findAll();
        $products = $productRepository->findAll();

        return $this->json([
            'users' => count($users),
            'orders' => count($orders),
            'totalEarned' => array_reduce($orders, fn ($carry, Order $order) => $carry + $order->getTotalPrice(), 0),
            'products' => count($products),
        ]);
    }
}

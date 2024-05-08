<?php

namespace App\Controller;

use App\Repository\CartRepository;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckoutController extends AbstractController
{
    #[Route('/api/checkout/{id}', name: 'checkout_order', methods: ['GET'])]
    public function checkout(OrderRepository $orderRepository, int $id): Response
    {
        $order = $orderRepository->find($id);

        if (!$order) {
            return new Response('Order not found.', 404);
        }

        if ($order->getStatus() !== "pending") {
            return new Response('Order is already processed.', 400);
        }





        return $this->processPayment($order);
    }

    private function processPayment(Order $order): Response
    {
        Stripe::setApiKey("sk_test_51PDoapP1r89JaicVPOLtQQshmMJZIjDMI6zFUuYD7fEQnFq61kxLq2T5t4rIwEMa60hnkaGon9b2XUgDfvr0fnRQ00q9IFJ3TR");

        $amount = $order->getTotalPrice();

        $intent = PaymentIntent::create([
            'amount' => $amount,
            'currency' => 'usd',
        ]);

        try {
            if ($intent->status == 'succeeded') {
                return new Response('Payment successful.');
            } else {
                return new Response('Payment failed.');
            }
        } catch (\Exception $e) {
            return new Response($e->getMessage());
        }
    }
}

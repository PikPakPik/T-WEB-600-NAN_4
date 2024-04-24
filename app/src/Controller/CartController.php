<?php

namespace App\Controller;

use App\DTO\UpdateUserDTO;
use App\Entity\User;
use App\Repository\CartRepository;
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
}

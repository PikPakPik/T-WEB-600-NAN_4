<?php

namespace App\Controller;

use App\DTO\UpdateUserDTO;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/users')]
class UserController extends AbstractController
{
    #[Route('', name: 'api_get_user', methods: ['GET'], format: 'json')]
    public function user(): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        return $this->json(
            $user,
            context: [
                'groups' => [
                    'user:read',
                    'date:read',
                ]
            ]
        );
    }

    #[Route('', name: 'app_update_user_data', methods: ['PATCH'], format: 'json')]
    public function updateUser(
        #[MapRequestPayload] UpdateUserDTO $updateDTO,
        EntityManagerInterface $entityManager
    ): Response {
        /** @var User $user */
        $user = $this->getUser();

        if (
            $updateDTO->getFirstname() !== $user->getFirstname() ||
            $updateDTO->getLastname() !== $user->getLastname() ||
            $updateDTO->getEmail() !== $user->getEmail()
        ) {
            $user->setFirstname($updateDTO->getFirstname());
            $user->setLastname($updateDTO->getLastname());
            $user->setEmail($updateDTO->getEmail());
            $entityManager->persist($user);
            $entityManager->flush();
        }

        return $this->json(
            $user,
            context: [
                'groups' => [
                    'user:read',
                    'date:read'
                ]
            ]
        );
    }
}

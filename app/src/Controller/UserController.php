<?php

namespace App\Controller;

use App\DTO\PaginationDTO;
use App\DTO\UpdateUserDTO;
use App\DTO\UserDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

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
        #[MapRequestPayload] UserDTO $updateDTO,
        EntityManagerInterface $entityManager
    ): Response {
        /** @var User $user */
        $user = $this->getUser();
        $hasChanged = false;

        if ($updateDTO->getFirstname() !== $user->getFirstname()) {
            $user->setFirstname($updateDTO->getFirstname());
            $hasChanged = true;
        }

        if ($updateDTO->getLastname() !== $user->getLastname()) {
            $user->setLastname($updateDTO->getLastname());
            $hasChanged = true;
        }

        if ($updateDTO->getEmail() !== $user->getEmail()) {
            $user->setEmail($updateDTO->getEmail());
            $hasChanged = true;
        }

        if ($updateDTO->getLogin() !== $user->getLogin()) {
            $user->setLogin($updateDTO->getLogin());
            $hasChanged = true;
        }

        if (isset($hasChanged)) {
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

    #[Route(path: '', name: 'create_user', methods: ['POST'], format: 'json')]
    public function createUser(
        #[MapRequestPayload] UserDTO $userDTO,
        EntityManagerInterface $entityManager,
    ): Response {
        $user = new User();
        $user->setFirstname($userDTO->getFirstname());
        $user->setLastname($userDTO->getLastname());
        $user->setEmail($userDTO->getEmail());
        $user->setLogin($userDTO->getLogin());
        $user->setPassword("azertyuiop");

        $entityManager->persist($user);
        $entityManager->flush();

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

    #[Route('/all', name: 'api_get_all_users', methods: ['GET'], format: 'json')]
    #[IsGranted('ROLE_ADMIN')]
    public function allUsers(UserRepository $userRepository, #[MapQueryString] ?PaginationDTO $paginationDTO = new PaginationDTO()): Response
    {
        $product = $userRepository->getUsers($paginationDTO);
        return $this->json(
            $product
        );
    }
}

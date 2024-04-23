<?php

namespace App\Controller;

use App\DTO\RegisterDTO;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'], format: 'json')]
    public function login(): Response
    {
        return $this->json([
            'code' => Response::HTTP_OK,
            'message' => 'Route not implemented yet.',
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'], format: 'json')]
    public function register(
        #[MapRequestPayload] RegisterDTO $registerDTO,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager
    ): Response {
        $checkIfUserExist = $userRepository->findOneBy(['email' => $registerDTO->email]);

        if ($checkIfUserExist) {
            return $this->json([
                'code' => Response::HTTP_CONFLICT,
                'i18n' => 'user.already_exist',
                'message' => 'User already exist.',
            ]);
        }

        $user = new User();
        $user->withObject($registerDTO);
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'code' => Response::HTTP_OK,
            'i18n' => 'user.created',
            'message' => 'User created successfully.',
        ]);
    }
}

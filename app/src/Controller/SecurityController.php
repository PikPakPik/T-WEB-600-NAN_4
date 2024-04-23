<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: 'api/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils, Request $request): JsonResponse
    {
        $responseData = []; // Structure de la réponse JSON
        $data = json_decode($request->getContent(), true);
        if ($this->getUser()) {
            // Si l'utilisateur est déjà connecté, vous pouvez renvoyer un message indiquant qu'il est déjà connecté
            $responseData['message'] = 'User is already logged in.';
            return new JsonResponse($responseData);
        }
        else{

        }
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        // Si vous souhaitez également renvoyer des informations sur l'erreur de connexion ou le dernier nom d'utilisateur,
        // vous pouvez les ajouter à la réponse JSON
        $responseData['last_username'] = $lastUsername;
        $responseData['error'] = $error ? $error->getMessage() : null;

        return new JsonResponse($responseData);
    }

    #[Route(path: '/api/logout', name: 'app_logout')]
    public function logout(): JsonResponse
    {
        $responseData = []; // Structure de la réponse JSON

        // Vous pouvez ajouter un message indiquant que l'utilisateur a été déconnecté avec succès
        $responseData['message'] = 'User logged out successfully.';

        return new JsonResponse($responseData);
    }
}

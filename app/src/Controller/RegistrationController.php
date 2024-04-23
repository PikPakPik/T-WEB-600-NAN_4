<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use App\Security\UsersAuthenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
    public function __construct(private EmailVerifier $emailVerifier)
    {
    }

    #[Route('/api/register', name: 'register', methods: "POST")]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager): JsonResponse
    {
        $responseData = []; // Structure de la réponse JSON
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setLogin($data['login']);
        $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));
        $user->setEmail($data['email']);
        $user->setRoles(['ROLE_USER']);
        if ($user->getEmail() && $user->getLogin()) {
            $user->setVerified(false);
        }
        // On vérifie si l'utilisateur existe déjà
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            // On crée la réponse JSON avec un message d'erreur
            $responseData['success'] = false;
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
        } elseif (!$user->getEmail() || !$user->getLogin()) {
            $responseData['success'] = false;
            $form = $this->createForm(RegistrationFormType::class, $user);
            $form->handleRequest($request);
        }
        else{
        $this->emailVerifier->sendEmailConfirmation(
            'app_verify_email',
            $user,
            (new TemplatedEmail())
                ->from(new Address('rollandtsokeng@gmail.com', 'nan 4 BOT'))
                ->to($user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
        $em = $this->$entityManager();
        $em->persist($user);
        $em->flush();
        $responseData['message'] = 'Registration successful. Please verify your email.';
        return $this->json(['message' => 'User created'], 201);

    }
        // En cas d'erreur de validation du formulaire
        $responseData['success'] = false;
        // Ajoutez des messages d'erreur ou toute autre information utile à la réponse JSON

        return new JsonResponse($responseData, Response::HTTP_BAD_REQUEST);
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request, TranslatorInterface $translator): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        // validate email confirmation link, sets User::isVerified=true and persists
        try {
            $this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
        } catch (VerifyEmailExceptionInterface $exception) {
            $this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

            return $this->redirectToRoute('app_register');
        }

        // @TODO Change the redirect on success and handle or remove the flash message in your templates
        $this->addFlash('success', 'Your email address has been verified.');

        return $this->redirectToRoute('app_register');
    }
}

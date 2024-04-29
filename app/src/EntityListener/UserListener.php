<?php

namespace App\EntityListener;

use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: User::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: User::class)]
readonly class UserListener
{
    public function __construct(
        private readonly UserPasswordHasherInterface $passwordHasher
    ) {
    }

    /**
     * @param User $user
     * @return void
     */
    public function onPrePersist(User $user): void
    {
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $user->getPassword()
        );
        $user->setPassword($hashedPassword);
        $user->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param User $user
     * @return void
     */
    public function onPreUpdate(User $user): void
    {
        $user->setUpdatedAt(new DateTimeImmutable());
    }
}

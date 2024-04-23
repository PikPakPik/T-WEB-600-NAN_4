<?php

declare(strict_types=1);

namespace App\EntityListener;

use App\Entity\Product;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: User::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: User::class)]
readonly class ProductListener
{

    /**
     * @param Product $product
     * @return void
     */
    public function onPrePersist(Product $product): void
    {
        $product->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param Product $product
     * @return void
     */
    public function onPreUpdate(Product $product): void
    {
        $product->setUpdatedAt(new DateTimeImmutable());
    }
}

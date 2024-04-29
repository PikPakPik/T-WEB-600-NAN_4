<?php

namespace App\EntityListener;

use App\Entity\Product;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: Product::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: Product::class)]
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

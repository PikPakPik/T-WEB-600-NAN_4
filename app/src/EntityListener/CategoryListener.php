<?php

namespace App\EntityListener;

use App\Entity\Category;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: Category::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: Category::class)]
readonly class CategoryListener
{
    /**
     * @param Category $category
     * @return void
     */
    public function onPrePersist(Category $category): void
    {
        $category->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param Category $category
     * @return void
     */
    public function onPreUpdate(Category $category): void
    {
        $category->setUpdatedAt(new DateTimeImmutable());
    }
}

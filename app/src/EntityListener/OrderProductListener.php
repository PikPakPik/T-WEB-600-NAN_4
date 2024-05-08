<?php

namespace App\EntityListener;

use App\Entity\OrderProduct;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: OrderProduct::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: OrderProduct::class)]
readonly class OrderProductListener
{
    /**
     * @param OrderProduct $orderProduct
     * @return void
     */
    public function onPrePersist(OrderProduct $orderProduct): void
    {
        $orderProduct->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param OrderProduct $orderProduct
     * @return void
     */
    public function onPreUpdate(OrderProduct $orderProduct): void
    {
        $orderProduct->setUpdatedAt(new DateTimeImmutable());
    }
}

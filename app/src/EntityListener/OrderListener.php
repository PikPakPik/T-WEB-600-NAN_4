<?php

namespace App\EntityListener;

use App\Entity\Order;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: Order::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: Order::class)]
readonly class OrderListener
{
    /**
     * @param Order $order
     * @return void
     */
    public function onPrePersist(Order $order): void
    {
        $order->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param Order $order
     * @return void
     */
    public function onPreUpdate(Order $order): void
    {
        $order->setUpdatedAt(new DateTimeImmutable());
    }
}

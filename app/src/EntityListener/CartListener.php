<?php



namespace App\EntityListener;

use App\Entity\Cart;
use App\Entity\Category;
use DateTimeImmutable;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;

#[AsEntityListener(event: Events::prePersist, method: 'onPrePersist', entity: Cart::class)]
#[AsEntityListener(event: Events::preUpdate, method: 'onPreUpdate', entity: Cart::class)]
readonly class CartListener
{

    /**
     * @param Cart $cart
     * @return void
     */
    public function onPrePersist(Cart $cart): void
    {
        $cart->setCreatedAt(new DateTimeImmutable());
    }

    /**
     * @param Cart $cart
     * @return void
     */
    public function onPreUpdate(Cart $cart): void
    {
        $cart->setUpdatedAt(new DateTimeImmutable());
    }
}

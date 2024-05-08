<?php

use App\Entity\Cart;
use App\Entity\OrderProduct;
use App\Entity\User;
use PHPUnit\Framework\TestCase;

class CartTest extends TestCase
{
    public function testAddProduct()
    {
        $cart = new Cart();
        $product = new OrderProduct();

        $cart->addProduct($product);

        $this->assertCount(1, $cart->getProducts());
        $this->assertTrue($cart->getProducts()->contains($product));
    }

    public function testRemoveProduct()
    {
        $cart = new Cart();
        $product = new OrderProduct();

        $cart->addProduct($product);
        $cart->removeProduct($product);

        $this->assertCount(0, $cart->getProducts());
        $this->assertFalse($cart->getProducts()->contains($product));
    }

    public function testSetOwner()
    {
        $cart = new Cart();
        $user = new User();

        $cart->setOwner($user);

        $this->assertSame($user, $cart->getOwner());
    }
}

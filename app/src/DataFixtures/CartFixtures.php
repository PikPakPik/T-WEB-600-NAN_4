<?php

namespace App\DataFixtures;

use App\Entity\Cart;
use App\Entity\Category;
use App\Entity\OrderProduct;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CartFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 5; $i++) {
            $user = $this->getReference('user_' . $i);

            $cart = new Cart();
            $cart->setOwner($user);

            for ($j = 0; $j < 5; $j++) {
                $cart->addProduct($this->getReference('orderProduct_' . rand(0, 9)));
            }

            $manager->persist($cart);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            ProductFixtures::class
        ];
    }
}

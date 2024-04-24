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

class OrderProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 10; $i++) {
            $product = $this->getReference('product_' . rand(0, 19));

            $orderProduct = new OrderProduct();
            $orderProduct->setQuantity($faker->numberBetween(1, 10));
            $orderProduct->setProduct($product);
            $orderProduct->setBuyPrice($product->getPrice());

            $this->setReference('orderProduct_' . $i, $orderProduct);

            $manager->persist($orderProduct);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            ProductFixtures::class
        ];
    }
}

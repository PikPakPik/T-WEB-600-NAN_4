<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 5; $i++) {
            $name = $faker->name();
            $description = $faker->paragraph();
            $photo = $faker->imageUrl();
            $price = $faker->randomFloat(2, 0, 1000);

            $product = new Product();
            $product->setName($name);
            $product->setDescription($description);
            $product->setPhoto($photo);
            $product->setPrice($price);
            $product->setCategory($this->getReference('category_' . rand(0, 4)));

            $manager->persist($product);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
        ];
    }
}

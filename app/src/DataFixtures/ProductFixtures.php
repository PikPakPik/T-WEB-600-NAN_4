<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 20; $i++) {
            $name = $faker->name();
            $description = $faker->sentence();
            $photo = $faker->imageUrl();
            $price = $faker->randomFloat(2, 0, 1000);
            $discount = $faker->randomFloat(2, 0, 100);
            $discountPrice = $price - ($price * $discount / 100);
            $active = $faker->boolean();
            $stock = $faker->numberBetween(0, 100);

            $product = new Product();
            $product->setName($name);
            $product->setDescription($description);
            $product->setPhoto($photo);
            $product->setPrice($price);
            $product->setDiscount($discount);
            $product->setDiscountPrice($discountPrice);
            $product->setActive($active);
            $product->setStock($stock);
            $product->setCategory($this->getReference('category_' . rand(0, 4)));

            $this->setReference('product_' . $i, $product);

            $manager->persist($product);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class
        ];
    }
}

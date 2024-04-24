<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 5; $i++) {
            $name = $faker->name();
            $active = $faker->boolean();

            $category = new Category();
            $category->setName($name);
            $category->setActive($active);

            $this->setReference('category_' . $i, $category);

            $manager->persist($category);
        }

        $manager->flush();
    }
}

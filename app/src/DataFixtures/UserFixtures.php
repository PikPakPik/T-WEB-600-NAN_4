<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        for ($i = 0; $i < 20; $i++) {
            $firstName = $faker->firstName();
            $lastName = $faker->lastName();
            $user = new User();
            $user->setFirstname($firstName);
            $user->setLastname($lastName);
            $user->setEmail(strtolower($firstName . '.' . $lastName . '@' . $faker->domainName()));
            $user->setPassword("azertyuiop");
            $user->setRoles(
                [
                    $faker->randomElement([
                        'ROLE_USER',
                        'ROLE_ADMIN'
                    ])
                ]
            );
            $this->setReference('user_' . $i, $user);

            $manager->persist($user);
        }

        $manager->flush();
    }
}

<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\UserDetails;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");
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


            $twoAdresses = $faker->numberBetween(1, 2);

            for ($j = 0; $j < $twoAdresses; $j++) {
                $userDetails = new UserDetails();
                $userDetails->setAddress($faker->streetAddress());
                $userDetails->setCity($faker->city());
                $userDetails->setZip($faker->postcode());
                $userDetails->setCountry($faker->country());
                if ($faker->boolean())
                    $userDetails->setPhone($faker->phoneNumber());
                if ($faker->boolean())
                    $userDetails->setState($faker->region());
                $userDetails->setOwner($user);
                $manager->persist($userDetails);
            }
        }

        $devadmin = new User();
        $devadmin->setFirstname('devadmin');
        $devadmin->setLastname('devadmin');
        $devadmin->setEmail('devadmin@epitech.eu');
        $devadmin->setPassword("Ep1t3ch@admin");
        $devadmin->setRoles(['ROLE_SUPER_ADMIN', 'ROLE_ADMIN']);
        $manager->persist($devadmin);

        $devuser = new User();
        $devuser->setFirstname('devuser');
        $devuser->setLastname('devuser');
        $devuser->setEmail('devuser@epitech.eu');
        $devuser->setPassword("Ep1t3ch@user");
        $manager->persist($devuser);


        $manager->flush();
    }
}

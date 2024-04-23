<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $userPasswordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        for ($i=0; $i<20; $i++){
            $product = new product();
            $product->setName('Product '.$i);
            $product->setActive(true);
            $product->setDiscount(mt_rand(0, 100));
            $product->setDiscountPrice(mt_rand(100, 1000));
            $product->setOnSale(mt_rand(0, 100) > 50);
            $product->setStock(mt_rand(10, 100));
            $product->setUpdatedAt(new \DateTimeImmutable());
            $product->setPrice(mt_rand(100, 1000));
            $product->setDescription('Description of product');
            $product->setPhoto('https://picsum.photos/200');
            $manager->persist($product);
        }
        $user = new User();
            $user->setEmail("user@bookapi.com");
            $user->setRoles(["ROLE_USER"]);
            $user->setPassword($this->userPasswordHasher->hashPassword($user, "password"));
            $manager->persist($user);
            $userAdmin = new User();
            $userAdmin->setEmail("admin@bookapi.com");
            $userAdmin->setRoles(["ROLE_ADMIN"]);
            $userAdmin->setPassword($this->userPasswordHasher->hashPassword($userAdmin, "password"));
            $manager->persist($userAdmin);
        $manager->flush();
    }

}

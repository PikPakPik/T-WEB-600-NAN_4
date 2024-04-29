<?php

use App\Repository\UserRepository;
use Monolog\Test\TestCase;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;


class AuthTest extends WebTestCase
{
    public function testLogin()
    {
        $client = static::createClient();
        $userRepository = static::getContainer()->get(UserRepository::class);

        $testUser = $userRepository->findOneByEmail('devadmin@epitech.eu');

        $client->loginUser($testUser);

        $client->request('GET', '/api/users');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function testLoginWithBadCredentials()
    {
        $client = static::createClient();
        $client->request('POST', '/api/login', [
            'email' => 'alexandre.tressel@icloud.com',
            'password' => 'azertyuiop'
        ]);

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
        $client->request('GET', '/api/users');
        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }

    // public function testRegisterUser()
    // {
    //     $client = static::createClient();
    //     $client->request('POST', '/api/register', [
    //         'email' => 'tressel.alexandre@icloud.com',
    //         'password' => 'azertyuiop',
    //         'firstname' => 'Alexandre',
    //         'lastname' => 'Tressel'
    //     ]);
    //     $this->assertEquals(200, $client->getResponse()->getStatusCode());
    //     $client->request('POST', '/api/login', [
    //         'email' => 'tressel.alexandre@icloud.com',
    //         'password' => 'azertyuiop'
    //     ]);
    //     $this->assertEquals(200, $client->getResponse()->getStatusCode());
    // }


    // public function testRegisterUserWithExistingEmail()
    // {
    //     $client = static::createClient();
    //     $client->request('POST', '/api/register', [
    //         'email' => 'devadmin@epitech.eu',
    //         'password' => 'Ep1t3ch@admin',
    //         'firstname' => 'devadmin',
    //         'lastname' => 'devadmin'
    //     ]);
    //     $this->assertEquals(409, $client->getResponse()->getStatusCode());
    // }

    public function testRegisterUserWithBadEmail()
    {
        $client = static::createClient();
        $client->request('POST', '/api/register', [
            'email' => 'tressel.alexandre',
            'password' => 'azertyuiop',
            'firstname' => 'Alexandre',
            'lastname' => 'Tressel'
        ]);
        $this->assertEquals(422, $client->getResponse()->getStatusCode());
    }
}

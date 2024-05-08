<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UserDTO
{
    public string $login;

    #[Assert\NotBlank]
    public string $firstName;

    #[Assert\NotBlank]
    public string $lastName;

    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email;


    /**
     * @return string
     */
    public function getFirstname(): string
    {
        return $this->firstName;
    }

    /**
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastName;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getLogin(): string
    {
        return $this->login;
    }
}

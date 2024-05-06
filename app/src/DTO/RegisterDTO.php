<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class RegisterDTO
{
    #[Assert\NotBlank]
    public string $firstname;

    #[Assert\NotBlank]
    public string $lastname;

    #[Assert\NotBlank]
    #[Assert\Email]
    public string $email;

    #[Assert\NotBlank]
    public string $password;

    /**
     * @return string
     */
    public function getFirstname(): string
    {
        return $this->firstname;
    }

    /**
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastname;
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
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @return bool
     */
    public function isValid(): bool
    {
        $emailValid = filter_var($this->email, FILTER_VALIDATE_EMAIL);
        $allFeilds = $this->firstname && $this->lastname && $this->email && $this->password;
        return $emailValid && $allFeilds;
    }
}

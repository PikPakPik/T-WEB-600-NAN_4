<img src="https://i.imgur.com/TBeuc8y.png" alt="TrellTech" width="300" height=300 align="right"/>

[![Main](https://github.com/EpitechMscProPromo2026/T-WEB-600-NAN_4/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/EpitechMscProPromo2026/T-WEB-600-NAN_4/actions/workflows/ci.yml) 

# Welcome to ECommerce :rocket:

The ECommerce project was executed by a group of 2/3 students from Epitech Nantes.  
We need to create an ECommerce app with some obligations like:
- Backend with Symfony
- Frontend with React
- Have Tests (Unit, Integration, Functional)
- Have a dockerized environment


## Table of contents
1. [Prerequisites](#prerequisites)
3. [Setup and configuration](#setup-and-configuration)
4. [Run the project](#running-the-project)
7. [Technologies](#technologies)
8. [Authors](#authors)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Composer](https://getcomposer.org/download/)
- [Symfony](https://symfony.com/download)
- [Node.js](https://nodejs.org/en/download/)


## Setup and configuration

### Clone the repository

#### _Logins and passwords_
| Login | Password |
| --- | --- |
| devadmin@epitech.eu | Ep1t3ch@admin |
| devuser@epitech.eu | Ep1t3ch@user |

#### _Open a terminal and run the following commands:_
```bash
$ git clone git@github.com:EpitechMscProPromo2026/T-WEB-600-NAN_4.git
$ cd T-WEB-600-NAN_4
$ ./setup.sh # This script will setup the project for you
$ cd app
$ php bin/console make:fixtures
$ docker compose up
# Wait for the containers to be ready
# Go to http://localhost/ 
# Enjoy the app!
```

### Manual setup

## Backend 

_Make sure you have the [prerequisites](#prerequisites) installed._

#### Configure the environment variables
```bash
$ cd app
$ cp .env.example .env
```

Change the values of the environment variables in the `.env` file.

#### Install the dependencies

```bash
$ cd app
$ composer install
$ php bin/console doctrine:database:create
$ php bin/console doctrine:migrations:migrate
$ php bin/console doctrine:fixtures:load
```

### Run the tests

```bash
$ php bin/phpcs --standard=PSR12 src/
```

## Frontend

_Make sure you have the [prerequisites](#prerequisites) installed._

#### Configure the environment variables
```bash
$ cd frontoffice
$ cp .env.example .env
```

Change the values of the environment variables in the `.env` file.

#### Install the dependencies

```bash
$ cd frontoffice
$ npm install
```

## Running the project

### Start the server and client

```bash
# At the root of the project
$ npm run start
Enjoy the app!
```

## Bonus

- _SOON_


## Technologies

![](https://img.shields.io/badge/Symfony-ED8B00?style=for-the-badge&logo=symfony&color=20232a)
![](https://img.shields.io/badge/PHP-ED8B00?style=for-the-badge&logo=php&color=20232a)
![](https://img.shields.io/badge/React-ED8B00?style=for-the-badge&logo=react&color=20232a)
![](https://img.shields.io/badge/Docker-ED8B00?style=for-the-badge&logo=docker&color=20232a)
![](https://img.shields.io/badge/Nginx-ED8B00?style=for-the-badge&logo=nginx&color=20232a)
![](https://img.shields.io/badge/Swagger-ED8B00?style=for-the-badge&logo=swagger&color=20232a)

## Authors

- [@PikPakPik](https://github.com/PikPakPik)
- [@EL HILA ZIYAD](https://github.com/Ziyad-El-Hila)
- [@Rolland-tsokeng](https://github.com/Rolland-tsokeng)

FROM php:8.3-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    zlib1g-dev \
    libxml2-dev \
    libpng-dev \
    libzip-dev \
    libpq-dev \
    vim curl debconf subversion git apt-transport-https apt-utils \
    build-essential locales acl mailutils wget nodejs zip unzip \
    gnupg gnupg1 gnupg2 \
    sudo \
    ssh \
&& docker-php-ext-install \
    pdo_pgsql \
    soap \
    zip \
    opcache \
    gd \
    intl

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

COPY opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY php.ini /usr/local/etc/php/conf.d/php.ini

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN usermod -u 1000 www-data && \
    usermod -a -G www-data root && \
    mkdir -p /var/www && chown -R www-data:www-data /var/www && \
    mkdir -p /var/www/.composer && \ 
    chown -R www-data:www-data /var/www/.composer

WORKDIR /var/www/project/
FROM php:8.3.0-zts-alpine
ENV COMPOSER_ALLOW_SUPERUSER=1
WORKDIR /var/www/html
RUN apk update 

RUN curl -sS https://getcomposer.org/installer | php -- --version=2.4.3 --install-dir=/usr/local/bin --filename=composer
RUN apk add postgresql postgresql-dev \
  && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql
COPY ./backend .
RUN composer update
RUN composer install

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
CMD ["php","artisan","serve","--host=0.0.0.0"]

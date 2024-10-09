#!/bin/sh

php artisan down
php artisan cache:clear

php artisan config:clear
php artisan config:cache

php artisan event:clear
php artisan event:cache

php artisan route:clear
php artisan view:clear

php artisan up

php artisan serve --host=0.0.0.0

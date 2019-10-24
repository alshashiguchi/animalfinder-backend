#!/bin/sh

export NODE_ENV='test'

echo "===> Undoing Migrations and Seeders..."

./node_modules/.bin/sequelize db:seed:undo:all
./node_modules/.bin/sequelize db:migrate:undo:all

echo "===> Running Migrations and Seeders..."

./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all

echo "===> Running tests..."

yarn run test
# README

This Repository consist of CryptStake Backend code.

## Local Setup

Clone this repo and switch to `develop` branch.

## Database Integration:

Commands:

Install MongoDB.

### Ubuntu/Linux:

1. wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
2. echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
3. sudo apt-get update
4. sudo apt-get install -y mongodb-org

start : sudo systemctl start mongod

reload deamon : sudo systemctl daemon-reload

status : sudo systemctl status mongod

You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:

enable : sudo systemctl enable mongod

stop : sudo systemctl stop mongod

restart : sudo systemctl restart mongod

using: mongo

stop mongodb : sudo service mongod stop

remove mongodb : sudo apt-get purge mongodb-org\*

Follow link for installation : https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04

### Mac:

1. brew tap mongodb/brew
2. brew update
3. brew install mongodb-community@5.0

start: brew services start mongodb-community@5.0

stop: brew services stop mongodb-community@5.0

restart: brew services restart mongodb-community@5.0

To connect mongodb shell use : `mongo`

## Backend Installation

In the project directory, Please run:

1. `yarn or npm install`

Please copy .env.example content in .env file and replace credentails if you want.

To start backend server:

1.  `yarn start`

Backend server start on port 4000

Backend api url : `http://localhost:4000/api`

### Create super admin

Start backend server and paste url `http://localhost:4000/api/admin/superAdmin` in browser to create super admin.

Super admin credentails:

email : `admin@cryptstake.com`

password: `kin@123456`

### run localhost via Docker

Prerequisite:

1. docker

command for building and running docker image.

1. docker-compose build --no-cache
2. docker-compose up
   OR
   docker-compose up --build

command for stoping a docker container
ctrl + c or docker-compose down

### Seeder

Yarn:

1. yarn start:seed

npm:

1. npm run start:seed
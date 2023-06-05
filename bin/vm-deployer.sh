#!/usr/bin/env bash

set -e
DB_NAME=$1

docker compose down -f ./docker-compose.yml
DB_NAME=${DB_NAME} docker compose up -d -f ./docker-compose.yml

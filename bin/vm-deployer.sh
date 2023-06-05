#!/usr/bin/env bash

set -e
DB_NAME=$1

docker compose down
DB_NAME=${DB_NAME} docker compose -f ~/talenta-bot/docker-compose.yml up -d 

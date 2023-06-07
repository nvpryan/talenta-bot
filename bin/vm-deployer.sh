#!/usr/bin/env bash

set -e
export DB_NAME=$1

docker compose down
docker compose -f ~/talenta-bot/docker-compose.yml pull app
docker compose -f ~/talenta-bot/docker-compose.yml up -d 
docker image prune -f
#!/usr/bin/env bash
source ./bin/utils.sh

set -e
environment=$1
DB_NAME=$2

env_check "$environment"


echo "Releasing to $environment"
ssh-keyscan "$SERVER_IP" >>~/.ssh/known_hosts
scp ./bin/vm-deployer.sh "$SERVER_USERNAME@$SERVER_IP":~/vm-deployer.sh
scp ./docker-compose.yml "$SERVER_USERNAME@$SERVER_IP":~/docker-compose.yml
ssh "$SERVER_USERNAME@$SERVER_IP" \
  "mkdir -p ~/talenta-bot/scripts/ ;" \
  "mv ~/vm-deployer.sh ~/talenta-bot/vm-deployer.sh ;" \
  "mv ~/docker-compose.yml ~/talenta-bot/docker-composer.yml ;" \
  "chmod +x ~/talenta-bot/vm-deployer.sh ;" \
  "~/talenta-bot/scripts/vm-deployer.sh '$DB_NAME'"
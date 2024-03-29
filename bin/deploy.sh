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
  "mkdir -p /usr/src/talenta-bot/ ;" \
  "mv ~/docker-compose.yml /usr/src/talenta-bot/docker-compose.yml ;" \
  "mv ~/vm-deployer.sh /usr/src/talenta-bot/vm-deployer.sh ;" \
  "chmod +x /usr/src/talenta-bot/vm-deployer.sh ;" \
  "cd /usr/src/talenta-bot ;" \
  "/usr/src/talenta-bot/vm-deployer.sh ${DB_NAME} ;"

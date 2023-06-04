#!/usr/bin/env bash
source ./bin/utils.sh

set -e
environment=$1

env_check "$environment"

tag=$(get_tag)

echo "Releasing to $environment"
ssh-keyscan "$SERVER_IP" >>~/.ssh/known_hosts
scp ./bin/vm-deployer.sh "$SERVER_USERNAME@$SERVER_IP":~/vm-deployer.sh
ssh "$SERVER_USERNAME@$SERVER_IP" \
  "mkdir -p ~/talenta-bot/scripts/ && mv ~/vm-deployer.sh ~/talenta-bot/scripts/vm-deployer.sh && chmod +x ~/talenta-bot/scripts/vm-deployer.sh && ~/talenta-bot/scripts/vm-deployer.sh '$tag'"

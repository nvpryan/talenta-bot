#!/usr/bin/env bash

set -e
tag=$1

echo "Remove obsolete docker container"
docker stop talenta-bot
docker rm talenta-bot

echo "Remove obsolete docker images"
docker rmi talenta-bot

docker pull "$tag"
docker run -d --restart always --net=host --name talenta-bot "$tag"

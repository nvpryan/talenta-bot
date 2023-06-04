#!/usr/bin/env bash

set -e
tag=$1

if [[ "$(docker ps -a -q)" != "" ]]; then
  echo "Remove obsolete docker container"
  docker stop "$(docker ps -a -q)"
  docker rm "$(docker ps -a -q)"
fi

if [[ "$(docker images -a -q)" != "" ]]; then
  echo "Remove obsolete docker images"
  docker rmi $(docker images -a -q)
fi

docker pull "$tag"
docker run -d --restart always --net=host "$tag"

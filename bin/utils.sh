#!/usr/bin/env bash

function get_hash() {
  hash=$(git rev-parse --short HEAD)
  echo "$hash"
}

function get_tag() {
  tag=nvpryan/talenta-bot:latest
  echo "$tag"
}

function env_check() {
  if [ "$1" != "production" ] && [ "$1" != "staging" ]; then
    echo "Build environment is not one of production or staging"
    exit
  fi
}

#!/usr/bin/env bash
source ./bin/utils.sh

set -e

tag=$(get_tag)

export TAG="$tag"

echo "Build image with tag: $tag"
docker build . --tag "$tag"
docker push "$tag"
#!/bin/bash

IMAGE=registry.ldblao.la/choulor/nitikam
if [ -n "$1" ]; then VERSION=$1; else VERSION="latest"; fi

echo "Building image $IMAGE:prod-$VERSION"

# docker build -t $IMAGE:prod-$VERSION -f Dockerfile.prod .
docker build --platform=linux/amd64 -t $IMAGE:prod-$VERSION .
docker push $IMAGE:prod-$VERSION

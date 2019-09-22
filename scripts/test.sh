function cleanup {
  echo "Removing container"
  docker-compose -f ./docker/docker-compose.test.yml -p homie.test down --remove-orphans
  docker-compose -f ./docker/docker-compose.test.yml -p homie.test rm
}

trap cleanup EXIT

docker-compose -f ./docker/docker-compose.test.yml -p homie.test up -d

docker-compose -f ./docker/docker-compose.test.yml -p homie.test exec node_app /bin/sh ./docker/scripts/installAndTestWatch.sh
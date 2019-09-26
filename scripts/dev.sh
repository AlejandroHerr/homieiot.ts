function cleanup {
  echo "Removing container"
  docker-compose -f ./docker/docker-compose.dev.yml -p homie.dev down --remove-orphans
  docker-compose -f ./docker/docker-compose.dev.yml -p homie.dev rm
}

trap cleanup EXIT

docker-compose -f ./docker/docker-compose.dev.yml -p homie.dev up

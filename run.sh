docker network create network-projet-final || true
if ! docker run -d --rm --name db-container --network network-projet-final --network-alias db-container mongo; then
    echo "Error: Failed to start MongoDB container"
    exit 1
fi
docker build -t express-project .
docker run -it --rm -p 5201:5000 --name express-app --network network-projet-final --network-alias backend --mount type=bind,source="$(pwd)"/,target=/app express-project
docker run -it --rm --name react-container-app --network network-projet-final --network-alias frontend -p 5173:5173 --mount type=bind,source="$(pwd)"/,target=/app node-dev-image
# Goodbuy-backend-test

build docker image

```
docker build . -t goodbuy-backend-node
```

run container

```
docker run -it -d -p 5001:1337 --name nodeapp goodbuy-backend-node
```

or

```
npm i && start
```

add env variables

```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_URL=
```

- sample route health check:

  - localhost:1337/sample/ping

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

# API
1. sample route health check:
  - localhost:1337/sample/ping

2. products
- get all products
  - localhost:1337/api/products/get/products
- create a product
  - localhost:1337/api/products/create/product

3. users
- get all users
  - localhost:1337/api/users/get/users
- create a user
  - localhost:1337/api/users/create/user



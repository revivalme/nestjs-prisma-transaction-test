## Installation

```bash
$ npm install
```

## Prepare DB

```
$ npx prisma migrate reset --preview-feature
```

## Running the app

```bash
# development
$ npm run start:dev

```

## Info

```
  Get info about user and his inventory
  [GET] http://localhost:3000/user

  Transaction bug, inventory item amount value changes in DB on error
  [POST] http://localhost:3000/inventory/sell1

  Transaction works perfectly, no data changes in DB on error
  [POST] http://localhost:3000/inventory/sell2

  What's the difference between last two routes?
```

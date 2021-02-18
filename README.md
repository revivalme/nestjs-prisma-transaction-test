## Info

```
  $transaction works incorrectly in NestJS when we pass method from external service.
  It doesn't roll back as expected.
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

```

## Bug reproduction

```bash
  # Prepare DB
  $ npx prisma migrate reset --preview-feature

  1) [GET] http://localhost:3000/user
     Get user information, attention to user inventory item amount attribute
  2) [POST] http://localhost:3000/inventory/sell
     (It will throw Internal server error 500 as expected, because write2 throws error)
  3) Get user information by /user. Amount not changed, so write1 rolled back successfully on write2 error.
  4) Now we will use same method for write2 but from external service (user.service.ts)
     Comment 52-68 and uncomment 70-86 lines in inventory.service.ts
  5) [POST] http://localhost:3000/inventory/sell
     (It will throw Internal server error 500 as expected, because write2 throws error)
  6) Get user information by /user. Amount decremented by one, write1 didn\'t roll back on write2 error.
     (BUG)
```

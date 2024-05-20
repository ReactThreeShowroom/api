# DB User Functions

The functions herein account for all db functions for Users (applicators), including auth.

## Contents

- [DB User Functions](#db-user-functions)
  - [Contents](#contents)
  - [Create](#create)
    - [createUser](#createuser)
  - [Read](#read)
    - [getUserById](#getuserbyid)
    - [getUserByIdAuth](#getuserbyidauth)
    - [getUserByUsername](#getuserbyusername)
    - [verifyUser](#verifyuser)
    - [getAllUsers](#getallusers)
  - [Update](#update)
    - [updateUser](#updateuser)
  - [Delete](#delete)
    - [deleteUser](#deleteuser)

## Create

### createUser

The async function `createUser` takes `userObj` as an argument with signature:

```js
{
  password: string,
  email: string,
  username: string
}
```

If any of these are missing, `missingCredentials` gets thrown as an error.

`name`, `phone`, and `email` are ciphered with `getCipherFromText`, taking plain text as an argument. `password` is hashed with the async helper `hashPass` which takes the `password` as an argument.

```js
getCipherFromText(text)
await hashPass(text)
```

`createUser` returns only the `id` of the new user.

## Read

### getUserById

`getUserById` takes `id` as an argument. The `id` is used in a query to `prisma` on the `user` model, with `findUnique`, with a `select` on `name`, `email`, `phone`, `admin`, `active`, `subs`.

```js
await getUserById(id)
```

If no `id` or `user` is found, `noUserId` and `noUserFoundId` are thrown respectively.

`user` object has a cipher on `name`, `email`, and `phone`. `getTextFromCipher` deciphers text and returns the text. Use `getTextFromCipher` to decipher the text and replace the fields on the `user` object.

Return `user`.

### getUserByIdAuth

`getUserByIdAuth` takes `id` as an argument. The `id` is used in a query to `prisma` on the `user` model, with `findUnique`, with an `include` on `subs` - subscriptions.

```js
await getUserByIdAuth(id)
```

If no user is found, `noUserFoundId` error is thrown.

`user` object has a cipher on `name`, `email`, and `phone`. `getTextFromCipher` deciphers text and returns the text. Use `getTextFromCipher` to decipher the text and replace the fields on the `user` object.

Return `user`.

### getUserByUsername

Async function `getUserByUsername` searches by unique field `username` through the `user` table.

`getTextFromCipher(text)` is used to decipher the `name`, `email`, and `phone` fields and replace them.

If no `user` is found, `noUserFoundUsername` error is thrown.

returns `user`

### verifyUser

Verifying the user takes an object as an object with keys `password` and `username`. This password is unhashed, and goes into the async `verifyPass` function.

```js
await verifyUser({ password, username })
```

`verifyUser` returns `id` of the `user` once verified by `verifyPass`

`verifyPass` is `async` and takes `password` and `user.password` as arguments.

```js
await verifyPass(password, user.password)
```

`verifyPass` returns `true` or `false`.

If there is no `password` or `username`, `verifyUser` throws `missingCredentials` error. If credentials are wrong, it throws `wrongCredentials`.

### getAllUsers

Not written

## Update

### updateUser

Not written

## Delete

### deleteUser

Not written

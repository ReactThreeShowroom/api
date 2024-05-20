# API User and Auth

- [API User and Auth](#api-user-and-auth)
  - [Base Routes](#base-routes)
  - [Middleware](#middleware)
  - [Auth Route](#auth-route)
    - [`/` Endpoint](#-endpoint)
      - [Auth Post](#auth-post)
    - [`/admin` Endpoint](#admin-endpoint)
      - [Admin + userId Get](#admin--userid-get)
      - [Admin + userId Patch](#admin--userid-patch)
      - [Admin + userId Delete](#admin--userid-delete)
    - [`/credentials` Endpoint](#credentials-endpoint)
      - [Credentials + userId Patch](#credentials--userid-patch)
    - [`/subs` Endpoint](#subs-endpoint)
      - [Subs + userId Get](#subs--userid-get)
      - [Subs + subId Get](#subs--subid-get)
      - [Subs + subId Patch](#subs--subid-patch)
    - [`/pending-subs` Endpoint](#pending-subs-endpoint)
      - [Pending Subs Get](#pending-subs-get)
      - [Pending Subs + subId Get](#pending-subs--subid-get)
      - [Pending Subs + subId Patch](#pending-subs--subid-patch)
  - [User Route](#user-route)

## Base Routes

`/auth` and `/user` are the base routes for all `user` (Applicator) routes. This does not include `client` models.

## Middleware

- `userCheck` (/index.js)
- `getAuthType`
- `checkLoginRegister`

## Auth Route

All routes start with `/auth`

### `/` Endpoint

Operations:

- Post

#### Auth Post

1. `checkLoginRegister` will get 'login' or 'register' from the query on the URL: `?type=<login/register>`
2. `loginRegisterUser` is the controller in `/controllers/user.js`
   1. `loginRegisterUser` gets the `type` and `body` from the `req`
   2. After checking the `type` of request, it calls `createUser(body)` or `verifyUser(body)`, setting `id` to the result
   3. After the `id` is obtained, `token` is generated from `getTokenFromId(id)`
   4. `user` is obtained from `getUserById(id)`
   5. If a token and user are both successfully obtained, the appropriate `message` is selected, `status` (created or OK) is set on the `res` object, and `res` sends an object with `{ token, message, user}`

Sample call for `register` operation:

  ```js
  // request
  fetch("https://host-name.com/?type=register", {
    method: "POST"
    headers: { "Content-Type": "application/json" }
    body: JSON.stringify({ password: "asdf1234", email: "a@test.com", username: "a" })
  })
  // response
  {
    user: {
      id: "...uuid",
      name: "a",
      email: "a@test.com",
      phone: "nothing",
      admin: false,
      active: true,
      subs: []
      },
      token: "...jwt",
      message: "Thank you for registering!"
  }
  // error response
  {
    name: 'failedLoginRegister',
    message: 'Unsuccessful login or register, please try again!'
  }
  ```

Sample call for `login` operation:

```js
// request
  fetch("https://host-name.com/?type=login", {
    method: "POST"
    headers: { "Content-Type": "application/json" }
    body: JSON.stringify({ password: "asdf1234", username: "a" })
  })
  // response
  {
    user: {
      id: "...uuid",
      name: "a",
      email: "a@test.com",
      phone: "nothing",
      admin: false,
      active: true,
      subs: []
      },
      token: "...jwt",
      message: "Successfully logged in!"
  }
  // error response
  {
    name: 'failedLoginRegister',
    message: 'Unsuccessful login or register, please try again!'
  }
```

### `/admin` Endpoint

Operations:

- Get `:userId`
- Patch `:userId`
- Delete `:userId`

#### Admin + userId Get

Sample Call and response:

```js

```

#### Admin + userId Patch

Sample Call and response:

```js

```

#### Admin + userId Delete

Sample Call and response:

```js

```

### `/credentials` Endpoint

Operations:

- Patch `:userId`

#### Credentials + userId Patch

Sample Call and response:

```js

```

### `/subs` Endpoint

Operations:

- Get `/user/:userId`
- Get `/sub/:subId`
- Patch `/:subId`

#### Subs + userId Get

Sample Call and response:

```js

```

#### Subs + subId Get

Sample Call and response:

```js

```

#### Subs + subId Patch

Sample Call and response:

```js

```

### `/pending-subs` Endpoint

Operations:

- Get
- Get `/:subId`
- Patch `/:subId`

#### Pending Subs Get

Sample Call and response:

```js

```

#### Pending Subs + subId Get

Sample Call and response:

```js

```

#### Pending Subs + subId Patch

Sample Call and response:

```js

```

## User Route

All routes start with `/user`

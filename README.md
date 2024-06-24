# ReactThreeShowroom

## Structure of .env file

```text
PG_USER=<pg username>
PG_PASSWORD=<password for pg user>
DB_ADDRESS=<localhost for dev>
DB_PORT=<default is 5432>
DB_NAME=<whatever you choose, default for this project is devShowroom>
DB_SCHEMA=<default is public>
// the below build generates interpolation for the above values
DATABASE_URL="postgresql://${PG_USER}:${PG_PASSWORD}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"
```

## structure of schema.prisma file

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Setting up Database

run command:
<br>
`createdb devShowroom`
<br>
or in psql:
<br>
`create database devShowroom;`
<br>
next run the migrate command from prisma:
<br>
`npx prisma migrate dev --name init`

## Routes

- /client
- /clientFavorite
- /color
- /item
- /pattern
- /user
- /userCred

## Dev Server

The Development Server has an extra route `/seed`

Create a post to the `/seed` route to perform a `migrate reset --force --skip-seed --skip-generate` command, followed by an attempt to create users. If there is no migration file, a backup function runs `migrate dev --name init` and then attemptes to perform the `rebuildDB` function again for seeding.

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
- /clientChoice
- /color
- /item
- /pattern
- /user
- /userCred

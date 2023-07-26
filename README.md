# Social Network with React, Tailwind, Next, Prisma, Mongo, NextAuth & Vercel

![My Skills](https://skills.thijs.gg/icons?i=mongodb,nextjs,react,tailwindcss,prisma)

Features:

- Authentication system
- Notification system
- Image Upload using Base64 strings
- Prisma ORM with MongoDB
- Responsive Layout
- 1 To Many Relations (User - Post)
- Many To Many Relations (Post - Comment)
- Following functionality
- Comments / Replies
- Likes functionality
- Vercel Deployment

### Prerequisites

**Node version 14.x**

### Install packages

```shell
npm i
```

### Prisma

```shell
npx prisma db push    # push the schema to the database
npx prisma generate   # generate the prisma client
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |

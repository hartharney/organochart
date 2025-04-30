# APPLICATION : ORGANOCHART

> A simple, department management application for an organization where permitted staff can get registered and sign in to make modifications to departments.
> The backend will manage authentication and
> While the frontend will provide a basic UI for interaction.

## TREE STRUCTURE

```bash
├── README.md
├── docker-compose.prod.yml
├── docker-compose.yml
├── organochart-api
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   ├── README.md
│   ├── dist
│   ├── eslint.config.mjs
│   ├── nest-cli.json
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   ├── test
│   ├── tsconfig.build.json
│   └── tsconfig.json
└── organochart-client
    ├── Dockerfile
    ├── Dockerfile.prod
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    ├── src
    └── tsconfig.json
```

## DIRECTORIES

- Backend

```javascript
cd organochart-api
```

stack : NestJs

- Frontend

```javascript
cd organochart-client
```

stack : NextJs

### DOCUMENTATION

🔗 [Backend README](./organochart-api/README.md)

🔗 [Frontend README](./organochart-client/README.md)

## Start App

> You can start both apps individually by naviagting into their directories

> Use the following commands

- Client

```bash
npm run dev
```

-API

```bash
npm run start:dev
```

both commands start in development mode.

## Start with Docker Compose

You can also spin up both services together using Docker Compose:

```bash
docker-compose up --build
```

## Stop Containers

```bash
docker-compose down
```

> This will build and run both the backend and frontend containers, exposing them on:

- Frontend: http://localhost:3000

- API: http://localhost:5000

## Requirements

- Node.js

- Docker

- Docker Compose

## Notes

- Make sure Postgresql is available locally or through a Docker container.

- Environment variables should be configured in .env files (see individual project READMEs).

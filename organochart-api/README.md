# Organochart — NestJS 🐺

A simple, department management application for an organization where permitted staff can get registered and sign in to make modifications to departments.  
Built with **NestJS**, **Postgres** , and **Docker** — following **SOLID principles** and clean architecture.

---

### Overview of NestJs

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

> To learn more about them read the [documentation](http://nodejs.org)

## Features

- **User Authentication** (JWT-based)
- **User login**
- **User Registration**
- **Create Departments and Subdepartments**
- **Update Departments and Subdepartments**
- **Delete Departments and Subdepartments**
- **Dockerized for local development**

> Directory tree (depth: 1)

```bash
.
├── Dockerfile
├── Dockerfile.prod
├── README.md
├── dist
├── eslint.config.mjs
├── nest-cli.json
├── node_modules
├── package-lock.json
├── package.json
├── src
├── test
├── tsconfig.build.json
└── tsconfig.json
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

The API will be available at:
http://localhost:5000

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Create an env file

```bash
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
SSL_MODE=verify-full
JWT_SECRET=
JWT_EXPIRES_IN=3600s
PORT=5000
```

# GraphQL Resolvers Overview

This Table provides an overview of the different GraphQL resolvers in our system, explaining each resolver and its function. The resolvers are responsible for handling queries and mutations for the `User` and `Department` entities.

## Resolvers Table

| Resolver                                | Type           | Description                                                                                      |
| --------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| `@Query('login')`                       | Mutation       | Handles user login by verifying credentials and returning a JWT token.                           |
| `@ResolveField('departments')`          | Field Resolver | Resolves the departments associated with a specific user, including their members.               |
| `@ResolveField('members')`              | Field Resolver | Resolves the members of a department, providing their details like `firstName`, `lastName`, etc. |
| `@Query('getDepartments')`              | Query          | Retrieves all departments, optionally filtered by certain criteria.                              |
| `@Mutation('createDepartment')`         | Mutation       | Allows for the creation of a new department, including setting the manager and members.          |
| `@Mutation('addUserToDepartment')`      | Mutation       | Adds a user to a specified department, updating the membership.                                  |
| `@Mutation('removeUserFromDepartment')` | Mutation       | Removes a user from a department.                                                                |

---

## Resolvers Explanation

### 1. **@Query('login')**

- **Type:** Mutation
- **Description:** This resolver handles the user login process. It verifies the user's email and password against the stored credentials. If valid, it returns an authentication token (`accessToken`) and the user's details, including their roles and associated departments.
- **Example:**
  ```ts
  async login(input: LoginInput): Promise<AuthResponse> {
    // Verifies credentials, generates JWT token, and returns user data
  }
           | ❌   |
  ```

## Tech Stack

| Logo                                                                                                               | Tool           | Description                 |
| :----------------------------------------------------------------------------------------------------------------- | :------------- | :-------------------------- |
| ![NestJS](https://nestjs.com/img/logo-small.svg)                                                                   | **NestJS**     | Backend framework (Node.js) |
| ![Postgresql](https://www.postgresql.org/media/img/about/press/elephant.png)                                       | **POSTGRESQL** | SQL database                |
| ![Docker](https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png)                                         | **Docker**     | Containerization            |
| ![Graphql](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png) | **GraphQl**    | GraphQl                     |
| ![JWT](https://cdn.auth0.com/blog/logos/jwt-logo.svg)                                                              | **JWT**        | Authentication tokens       |
| ![TypeScript](https://cdn.worldvectorlogo.com/logos/typescript.svg)                                                | **TypeScript** | Type-safe JavaScript        |

## Deployment

> This backend is containerized and deployable to:

> - AWS ECS / Fargate

> - Render

> - DigitalOcean

> - Any Docker-compatible platform

> - The frontend will be deployable on Vercel.

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Stay in touch

- Author - [Hart Harney](https://github.com/hartharney)
- Instagram - [@hartharney](https://instagram.com/hart_harney)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# 🎮 Game Lobby API — NextJs 🐺

A simple, department management application for an organization where permitted staff can get registered and sign in to make modifications to departments.
Built with **NextJS**,

---

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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

| Page        | Endpoint     | Description                       | Auth |
| :---------- | :----------- | :-------------------------------- | :--- |
| Home        | /            | Landing Page (reroutes to /login) | ❌   |
| Dashboard   | /leaderboard | Overview                          | ✅   |
| departments | /departments | Join active session & pick number | ✅   |
| Register    | /register    | Register account                  | ❌   |
| Login       | /login       | Login account                     | ❌   |

## Tech Stack

## 🖥️ Frontend Tech Stack

| Logo                                                                    | Tool               | Description                      |
| :---------------------------------------------------------------------- | :----------------- | :------------------------------- | --- |
| ![TanStack Query](https://tanstack.com/query/v4/images/emblem-dark.svg) | **TanStack Query** | Powerful data fetching & caching |
| ![TypeScript](https://cdn.worldvectorlogo.com/logos/typescript.svg)     | **TypeScript**     | Type-safe JavaScript             |
| ![Tailwind CSS](https://tailwindcss.com/favicons/favicon-32x32.png?v=3) | **Tailwind CSS**   | Utility-first CSS framework      |     |

## Deployment

> - The frontend will be deployable on Vercel / AWS EC2.

## Stay in touch

- Author - [Hart Harney](https://github.com/hartharney)
- Instagram - [@hartharney](https://instagram.com/hart_harney)

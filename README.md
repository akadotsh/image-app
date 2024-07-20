# Full Stack Photo Upload Application

<!-- ![GitHub](https://img.shields.io/github/license/yourusername/your-repo-name)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/your-repo-name) -->

<!-- ![GitHub top language](https://img.shields.io/github/languages/top/boidushya/better-lyrics-api)
![GitHub License](https://img.shields.io/github/license/boidushya/better-lyrics-api)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/boidushya/better-lyrics-api/go.yml) -->

<!-- ![Railway](https://img.shields.io/badge/deployement-railway-javascript?logo=railway&logoColor=fff&color=851AE6)
![Vercel](https://img.shields.io/badge/deployement-railway-javascript?logo=railway&logoColor=fff&color=851AE6) -->

## Description

This project is a web application that allows users to sign up, log in, upload photos to AWS S3, and view their uploaded photos. It features a Next.js frontend with Redux state management and a GraphQL API backend.

## Table of Contents

- [Full Stack Photo Upload Application](#full-stack-photo-upload-application)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [📖 Documentation](#-documentation)
  - [🛠 Features](#-features)
  - [🧱 Stack](#-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Database](#database)
  - [Setup](#setup)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
    - [AWS S3](#aws-s3)
  - [Approach and Trade-offs](#approach-and-trade-offs)
  - [Backend Architecture and Deployment](#backend-architecture-and-deployment)
    - [Frontend](#frontend-2)
  - [🚀 Deployments](#-deployments)

## 📖 Documentation

- [Image Upload API Documentation](https://image-app-production.up.railway.app/documentation/)

## 🛠 Features

- User authentication (signup/login)
- Image upload
- View all uploaded pictures
- Delete Picture

## 🧱 Stack

### Backend

- Language: Golang
- [Chi](https://github.com/go-chi/chi) for creating HTTP Handlers
- [gqlgen](https://github.com/99designs/gqlgen) for creating GraphQL server in golang
- [JWT](https://github.com/golang-jwt/jwt) for authentication
- [AWS S3](https://aws.amazon.com/s3/) for photo storage
- [spectaql](https://github.com/anvilco/spectaql) for generating documentation
- [Mongodb driver](https://github.com/mongodb/mongo-go-driver)

### Frontend

- framework: [Next.js(app router)](https://nextjs.org/docs/app)
- [Redux](https://redux.js.org/) for state management
- [Tanstack Query](https://tanstack.com/) for Graphql API calls and asynchronous state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) as UI Kit
- [vitest](https://vitest.dev/) for testing

### Database

- [Mongodb](https://www.mongodb.com/products/platform/atlas-database)

## Setup

Clone the repository:

```bash
git clone https://github.com/[YOUR_ACCOUNT]/image-app.git
```

### Frontend

1. Navigate to the project directory: `cd frontend`
2. Install the dependencies: `npm install`
3. Start the server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

### Backend

1. Navigate to the project directory: `cd backend`
2. Install the dependencies: `go mod tidy`
3. Copy the `.env.example` file to `.env` and update the environment variables as needed: `cp .env.example .env`
4. Start the server: `go run main.go`

### AWS S3

1. Create an S3 bucket in your AWS account
2. Ensure your AWS credentials have the necessary permissions

## Approach and Trade-offs

## Backend Architecture and Deployment

1. In the backend, I'm using Golang with Chi Router to create HTTP handlers and [gqlgen](https://github.com/99designs/gqlgen) for creating schema-based GraphQL APIs.

2. I'm using MongoDB to store data in the database from MongoDB Atlas and using the Go driver to interact with the database. I have not used any ORM because the setup is simpler and faster.

3. I have created a middleware called authMiddleware to access protected routes.

4. For deployment, I have created a Dockerfile and added instructions on how to build and run the app.

### Frontend

1. In the frontend, I'm using TanStack Query instead of Apollo Client because it offers a simpler setup and comes with developer tools, which greatly enhances the Developer Experience (DX).

2. For the UI Kit, I've utilized [Shadcn UI](https://ui.shadcn.com/) due to its high customizability and lack of extra dependencies. With Shadcn UI, we only need to install the specific UI components we intend to use.

## 🚀 Deployments

The Frontend of the application is deployed on [Vercel](https://vercel.com/) and the Backend of the application is deployed on [Railway](https://railway.app/)

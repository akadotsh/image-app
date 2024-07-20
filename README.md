# Full Stack Photo Upload Application

## Description

A Full stack Image Upload Application built with Nextjs and Golang

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
  - [Getting Started](#getting-started)
  - [Setup](#setup)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
    - [AWS S3](#aws-s3)
    - [Backend Architecture and Deployment](#backend-architecture-and-deployment)
    - [Frontend Architecture](#frontend-architecture)
  - [🚀 Deployment](#-deployment)

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
- [Tanstack Query](https://tanstack.com/) for asynchronous state management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) as UI Kit
- [vitest](https://vitest.dev/) for testing

### Database

- [Mongodb](https://www.mongodb.com/products/platform/atlas-database)

## Getting Started

Prerequisites:

- Node.js
- Go
- MongoDB
- AWS account with S3 bucket

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

### Backend Architecture and Deployment

1. In the backend, I'm using Golang with Chi Router to create HTTP handlers and [gqlgen](https://github.com/99designs/gqlgen) for creating schema-based GraphQL APIs.

2. I'm using MongoDB to store data in the database from MongoDB Atlas and using the Go driver to interact with the database. I have not used any ORM because the setup is simpler and faster.

3. I have created a middleware called authMiddleware to access protected routes.

4. For deployment, I have created a Dockerfile and added instructions on how to build and run the app.

### Frontend Architecture

1. The Frontend is built with:

   - Next.js
   - Tailwind CSS
   - Redux
   - TanStack Query
   - Shadcn UI

2. I'm using TanStack Query instead of Apollo Client because it offers a simpler setup and comes with developer tools, which greatly enhances the Developer Experience (DX).

3. For the UI Kit, I've utilized [Shadcn UI](https://ui.shadcn.com/) due to its high customizability and lack of extra dependencies. With Shadcn UI, we only need to install the specific UI components we intend to use.

## 🚀 Deployment

- The Frontend of the application is deployed on [Vercel](https://vercel.com/).
- The Backend of the application is deployed on [Railway](https://railway.app/).

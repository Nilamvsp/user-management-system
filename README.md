# User Management System

A Full Stack CRUD application built using React, Express.js, and MySQL.

## Features

* View all users
* Add a new user
* Update existing user
* Delete user
* Form validation using React Hook Form
* REST API integration using Axios
* MySQL database integration

## Tech Stack

### Frontend

* React
* React Hook Form
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js
* MySQL

## API Endpoints

* GET /users
* GET /users/:id
* POST /users
* POST /users/bulk
* PUT /users/:id
* PATCH /users/:id
* DELETE /users/:id

## Installation

### Backend

```bash
npm install
node app.js
```

### Frontend

```bash
npm install
npm run dev
```

### Database

Create a MySQL database:

```sql
CREATE DATABASE userdb;
```

Create a users table with fields:

* id
* name
* email
* age
* city

## Author

Nilam Sutar

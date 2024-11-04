# API Development Project

## Overview

This project is a robust backend application developed using TypeScript, designed to manage organizations and user invitations with limited permissions. The application utilizes MongoDB for data storage, Redis for token management, and is containerized using Docker for easy deployment.

## Key Features

- **User Authentication**:

  - Signup and signin endpoints with secure token generation.
  - Refresh token mechanism for extended user sessions.

- **CRUD Operations**:

  - Create, read, update, and delete operations for organizations.
  - Manage organization members with specified access levels.

- **Token Management**:

  - Implements token handling using Redis for efficient session management.

- **Dockerized Application**:
  - Built using Docker and Docker Compose for consistent environments across development and production.

## Technologies Used

- TypeScript
- Node.js
- Express.js
- MongoDB
- Redis
- Docker
- Docker Compose

## API Endpoints

### User Authentication

- **Signup**: `POST /signup`

  - Request Body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "string"
    }
    ```

- **Signin**: `POST /signin`

  - Request Body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "string",
      "access_token": "string",
      "refresh_token": "string"
    }
    ```

- **Refresh Token**: `POST /refresh-token`
  - Request Body:
    ```json
    {
      "refresh_token": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "string",
      "access_token": "string",
      "refresh_token": "string"
    }
    ```

### Organization Management

- **Create Organization**: `POST /organization`

  - Authorization: Bearer [Token]
  - Request Body:
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - Response:
    ```json
    {
      "organization_id": "string"
    }
    ```

- **Read Organization**: `GET /organization/{organization_id}`

  - Authorization: Bearer [Token]
  - Response:
    ```json
    {
      "organization_id": "string",
      "name": "string",
      "description": "string",
      "organization_members": [
        {
          "name": "string",
          "email": "string",
          "access_level": "string"
        }
      ]
    }
    ```

- **Read All Organizations**: `GET /organization`
  - Authorization: Bearer [Token]
  - Response:
    ```json
    [
      {
        "organization_id": "string",
        "name": "string",
        "description": "string",
        "organization_members": [
          {
            "name": "string",
            "email": "string",
            "access_level": "string"
          }
        ]
      },
      {}
    ]
    ```

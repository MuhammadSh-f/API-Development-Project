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
      }
    ]
    ```

- **Update Organization**: `PUT /organization/{organization_id}`

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
      "organization_id": "string",
      "name": "string",
      "description": "string"
    }
    ```

- **Delete Organization**: `DELETE /organization/{organization_id}`

  - Authorization: Bearer [Token]
  - Response:
    ```json
    {
      "message": "string"
    }
    ```

- **Invite User to Organization**: `POST /organization/{organization_id}/invite`
  - Authorization: Bearer [Token]
  - Request Body:
    ```json
    {
      "user_email": "string"
    }
    ```
  - Response:
    ```json
    {
      "message": "string"
    }
    ```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- Docker
- MongoDB (or an online MongoDB URI)
- Redis (or an online Redis URI)

### Installation

1. Clone the repository:

```bash
  git clone https://github.com/MuhammadSh-f/API-Development-Project.git
  cd API-Development-Project
```

2. Install dependencies:

```bash
  npm install
```

3. Configure environment variables:

. Create a .env file in the root directory and add your MongoDB and Redis connection strings.

4. Run the application using Docker:

```bash
  docker-compose up --build
```

5. Access the API at http://localhost:8080.

## Deployment

Follow the instructions in the deployment section of the documentation to deploy this project on AWS Elastic Beanstalk or any other cloud provider.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, feel free to reach out via [GitHub](@MuhammadSh-f), or email muhammadshaker.developer@gmail.com

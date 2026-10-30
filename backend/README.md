
# Backend – Collaborative Cloud Deployment

## Overview

The backend is the core server-side component of the Collaborative Cloud Deployment platform. It provides REST API services, real-time communication, authentication, and persistent data management to support a multi-user collaborative whiteboard environment.

Built using **Node.js, Express.js, and Socket.IO**, the backend enables multiple users to collaborate on shared whiteboards in real time. It manages user sessions, room-based communication, drawing synchronization, cursor tracking, and board state persistence.

The architecture integrates MongoDB for persistent storage and Redis for scalable real-time communication across multiple backend instances.

## Key Features

- **REST API Services:** Handles client-server communication and application operations.
- **Real-Time Collaboration:** Uses Socket.IO to synchronize drawing activities between multiple users.
- **Room-Based Architecture:** Provides isolated collaborative workspaces for different users and sessions.
- **JWT Authentication:** Secures user authentication and communication.
- **Live Cursor Tracking:** Broadcasts cursor movements and user presence information.
- **Drawing Synchronization:** Synchronizes drawing events and board states across connected clients.
- **Undo/Redo Management:** Supports collaborative drawing history operations.
- **MongoDB Integration:** Stores persistent whiteboard and application data.
- **Redis Integration:** Enables scalable Socket.IO communication across multiple server instances.
- **Docker Support:** Supports containerized backend deployment and environment consistency.

## Technology Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Real-Time Communication | Socket.IO |
| Database | MongoDB |
| Caching & Scaling | Redis |
| Authentication | JWT |
| Containerization | Docker |
| Orchestration | Docker Compose |
| Reverse Proxy | Nginx |

## Architecture

The backend follows a modular server-side architecture:

1. **API Layer:** Handles incoming HTTP requests from the frontend.
2. **Authentication Layer:** Validates JWT tokens and manages secure access.
3. **WebSocket Layer:** Manages persistent Socket.IO connections and real-time events.
4. **Room Management:** Maintains isolated collaborative sessions.
5. **Data Layer:** Interacts with MongoDB for persistent storage.
6. **Scaling Layer:** Uses Redis to coordinate real-time events across multiple backend instances.

## Real-Time Communication

The backend uses Socket.IO to provide bidirectional communication between connected clients.

### Client-to-Server Events
- `join-room` – Joins a collaborative whiteboard room.
- `drawing` – Sends drawing updates to the server.
- `cursor-move` – Shares the user's cursor position.
- `undo` – Requests an undo operation.

### Server-to-Client Events
- `user-joined` – Notifies users when another participant joins.
- `drawing` – Broadcasts drawing updates.
- `cursor-update` – Shares updated cursor positions.
- `board-state` – Synchronizes the current board state.

## Installation and Setup

### Prerequisites

- Node.js 18 or above
- npm
- MongoDB (Local or MongoDB Atlas)
- Redis (for scalable real-time communication)

### 1. Clone the Repository

```bash
git clone https://github.com/KuldeepSahoo917/Collaborative_Cloud_Deployment.git
```

### 2. Navigate to Backend

```bash
cd Collaborative_Cloud_Deployment/backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables.

```env
PORT=4000
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
```

Use the actual environment variable names expected by the backend source code.

### 5. Start the Development Server

```bash
npm run dev
```

## Docker Deployment

The backend supports containerized deployment using Docker and Docker Compose.

From the project root directory, execute:

```bash
docker-compose up --build
```

This starts the application services defined in the Docker Compose configuration.

## Scalability and Reliability

The backend architecture is designed to support multiple concurrent users and collaborative sessions.

- Redis Adapter enables Socket.IO communication across multiple backend instances.
- MongoDB provides persistent storage for application data.
- Docker ensures consistent application environments.
- Nginx provides reverse proxy capabilities and supports production traffic routing.
- JWT-based authentication helps secure application communication.

## Security

- Token-based authentication using JWT.
- Environment-based configuration for sensitive credentials.
- Controlled cross-origin resource sharing (CORS).
- Room-based access management.
- Secure communication through HTTPS when deployed behind an SSL-enabled reverse proxy.

## Future Enhancements

- Advanced role-based access control.
- Improved collaborative session management.
- Enhanced monitoring and logging.
- Automated CI/CD deployment pipelines.
- Advanced backend performance optimization.

## License

This project is licensed under the MIT License. See the root-level `LICENSE` file for details.
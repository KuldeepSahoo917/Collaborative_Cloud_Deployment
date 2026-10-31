# Enterprise Collaborative Whiteboard

> A real-time collaborative whiteboard application built with enterprise-grade architecture, designed for seamless team collaboration with professional UI/UX standards.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io)

## Features

- **Real-time Collaboration**: Multiple users can draw simultaneously with live cursor tracking
- **Multi-room Architecture**: Isolated workspaces with secure per-room access control
- **Professional Drawing Tools**: Pen, eraser, text, shapes, and sticky notes
- **Contextual Properties Panel**: Dynamic tool settings based on active selection
- **User Presence Indicators**: See who's online with floating cursor labels
- **Dark/Light Theme Toggle**: Enterprise-grade UI with customizable themes
- **Undo/Redo Support**: Full history management for all drawing operations
- **Export Capabilities**: Save boards as PNG or PDF
- **Version Control**: Rollback to previous board states
- **JWT Authentication**: Secure user sessions with token-based auth
- **Persistent Storage**: MongoDB integration for saving board data
- **Horizontally Scalable**: Redis adapter for Socket.IO clustering

## Architecture

Frontend: React + TypeScript + Konva + Vite
Backend: Node.js + Express + Socket.IO
Database: MongoDB (drawing persistence) + Redis (scaling)
Proxy: Nginx (reverse proxy, SSL, caching)
Infrastructure: Docker + Docker Compose

text


## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker & Docker Compose (for containerized deployment)
- MongoDB (local or Atlas)
- Redis (optional, for scaling)

### Installation

1. **Clone the repository**

git clone 
```
cd collaborative-whiteboard
```

2. **Set up environment variables**

cp .env.example .env

Edit .env with your configuration


3. **Install dependencies**

### Backend
```
cd backend
```
```
npm install
```
### Frontend
```
cd ../frontend
```
```
npm install
```

4. **Run locally (development)**

Terminal 1 - Backend
```
cd backend
```
```
npm run dev
```

Terminal 2 - Frontend
```
cd frontend
```
```
npm run dev
```

Visit `http://localhost:5173`

### Docker Deployment
```
docker-compose up --build
```
Access the app at `http://localhost` (or your configured domain)

## Environment Variables

Create a `.env` file in the root directory:

Backend
PORT=4000
JWT_SECRET=your_super_secret_key_change_this
MONGODB_URI=mongodb://localhost:27017/whiteboard
REDIS_URL=redis://localhost:6379

Frontend
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 + TypeScript |
| Canvas Rendering | Konva.js |
| Build Tool | Vite |
| Styling | CSS Modules + CSS Variables |
| State Management | React Hooks |
| Backend Runtime | Node.js 18 |
| Web Framework | Express.js |
| Real-time Engine | Socket.IO |
| Database | MongoDB |
| Caching/Scaling | Redis |
| Authentication | JWT |
| Reverse Proxy | Nginx |
| Containerization | Docker |

## API & WebSocket Events

### Socket.IO Events

**Client → Server**
- `join-room`: Join a collaborative room
- `drawing`: Send drawing data
- `cursor-move`: Share cursor position
- `undo`: Request undo operation

**Server → Client**
- `user-joined`: New user entered room
- `drawing`: Broadcast drawing updates
- `cursor-update`: Other users' cursor positions
- `board-state`: Full board sync on join

## UI/UX Features

- **Enterprise Dark Mode**: Professional, minimal aesthetic (default)
- **Light Mode**: Toggle via theme switcher
- **Responsive Design**: Works on desktop and tablet
- **Keyboard Shortcuts**: Ctrl+Z (undo), Ctrl+Y (redo)
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Security

- JWT-based authentication for all socket connections
- Per-room access control
- Rate limiting on API endpoints
- CORS configuration for trusted origins
- Environment variable protection
- Nginx SSL/TLS termination

## Scalability

- **Horizontal Scaling**: Redis adapter allows multiple server instances
- **Database Indexing**: Optimized MongoDB queries
- **Nginx Caching**: Static asset caching with gzip compression
- **Load Balancing**: Ready for reverse proxy load distribution

## Testing

Backend tests
```
cd backend
```
```
npm test
```

Frontend tests
```
cd frontend
```
```
npm test
```

## Deployment

### Production Build

Frontend
```
cd frontend
```
```
npm run build
```

Backend
```
cd backend
```
```
npm run build
```

### Deployment Options

- **Docker**: Use provided `docker-compose.yml`
- **Cloud Platforms**: AWS EC2, DigitalOcean, Heroku, Railway
- **Serverless**: Adapt backend for AWS Lambda + API Gateway
- **Static Hosting**: Frontend on Vercel/Netlify, backend on dedicated server

## Roadmap

- [ ] Export board as PNG/PDF
- [ ] Version history with rollback
- [ ] Commenting system
- [ ] Real-time chat integration
- [ ] Shape library (templates)
- [ ] Mobile app (React Native)
- [ ] AI-powered drawing suggestions
- [ ] Permissions system (view/edit roles)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Figma FigJam, Miro, and Microsoft Whiteboard
- Built with modern web technologies and best practices
- Special thanks to the open-source community

---

⭐ If you found this project helpful, please give it a star!

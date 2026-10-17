1 .\backend\.env.example
PORT=5000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development


2 .\backend\.gitignore
node_modules/
.env
*.log
dist/
build/
.DS_Store

3 .\backend\README.md

!!!!!!!!

4 .\frontend\.gitignore
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

.env.local
.env.production


5 .\frontend\eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])


6 .\frontend\index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700\&display=swap" rel="stylesheet">
    <title>Collaborative Whiteboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


7 .\frontend\README.md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js

export default defineConfig(\[

&#x20; globalIgnores(\['dist']),

&#x20; {

&#x20;   files: \['\*\*/\*.{ts,tsx}'],

&#x20;   extends: \[

&#x20;     // Other configs...



&#x20;     // Remove tseslint.configs.recommended and replace with this

&#x20;     tseslint.configs.recommendedTypeChecked,

&#x20;     // Alternatively, use this for stricter rules

&#x20;     tseslint.configs.strictTypeChecked,

&#x20;     // Optionally, add this for stylistic rules

&#x20;     tseslint.configs.stylisticTypeChecked,



&#x20;     // Other configs...

&#x20;   ],

&#x20;   languageOptions: {

&#x20;     parserOptions: {

&#x20;       project: \['./tsconfig.node.json', './tsconfig.app.json'],

&#x20;       tsconfigRootDir: import.meta.dirname,

&#x20;     },

&#x20;     // other options...

&#x20;   },

&#x20; },

])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js

// eslint.config.js

import reactX from 'eslint-plugin-react-x'

import reactDom from 'eslint-plugin-react-dom'



export default defineConfig(\[

&#x20; globalIgnores(\['dist']),

&#x20; {

&#x20;   files: \['\*\*/\*.{ts,tsx}'],

&#x20;   extends: \[

&#x20;     // Other configs...

&#x20;     // Enable lint rules for React

&#x20;     reactX.configs\['recommended-typescript'],

&#x20;     // Enable lint rules for React DOM

&#x20;     reactDom.configs.recommended,

&#x20;   ],

&#x20;   languageOptions: {

&#x20;     parserOptions: {

&#x20;       project: \['./tsconfig.node.json', './tsconfig.app.json'],

&#x20;       tsconfigRootDir: import.meta.dirname,

&#x20;     },

&#x20;     // other options...

&#x20;   },

&#x20; },

])

```


8 .\frontend\tsconfig.app.json
{
    "compilerOptions": {
      "composite": true,
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
 
      /* Bundler mode */
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
 
      /* Linting */
      "strict": true,
      "noUnusedLocals": false,
      "noUnusedParameters": false,
      "noFallthroughCasesInSwitch": true
    },
    "include": ["src"]
  }
 

9 .\frontend\tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}


10 .\frontend\tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}


11 .\frontend\vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  }
})


12 .\frontend\vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SOCKET_URL: string;
    // Add other env variables here as needed
  }
 
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
 
!!!!!!!!

13 .\nginx\whiteboard.conf
# WebSocket upgrade configuration
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

# Upstream backend server
upstream whiteboard_backend {
    server localhost:5000;
    keepalive 64;
}

# HTTP server - redirect to HTTPS (production)
server {
    listen 80;
    server_name whiteboard.yourdomain.com;
 
    # Allow Let's Encrypt validation
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
 
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server (production)
server {
    listen 443 ssl http2;
    server_name whiteboard.yourdomain.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/whiteboard.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/whiteboard.yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Frontend static files
    location / {
        root /var/www/whiteboard/dist;
        try_files $uri $uri/ /index.html;
 
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
 
        # No cache for HTML
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        }
    }

    # API endpoints
    location /api/ {
        proxy_pass http://whiteboard_backend/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
 
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # WebSocket connections (Socket.IO)
    location /socket.io/ {
        proxy_pass http://whiteboard_backend/socket.io/;
        proxy_http_version 1.1;
 
        # WebSocket upgrade headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
 
        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
 
        # WebSocket timeout settings (7 days for long-lived connections)
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
 
        # Disable buffering for WebSocket
        proxy_buffering off;
        proxy_cache off;
 
        # Increase buffer sizes for WebSocket
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        proxy_busy_buffers_size 8k;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://whiteboard_backend/health;
        access_log off;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}

# Development server (HTTP only)
server {
    listen 80;
    server_name localhost;

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # WebSocket
    location /socket.io/ {
        proxy_pass http://localhost:5000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_buffering off;
    }
}


14 .\.gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment variables
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*
yarn-debug.log*
lerna-debug.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# SSL certificates (if stored locally)
*.pem
*.key
*.crt


15 .\CONTRIBUTING.md
# Contributing to Collaborative Whiteboard

Thank you for considering contributing to this project by Kuldeep Sahoo!

## Code Standards
- Use TypeScript for frontend code
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic

## Pull Request Process
1. Fork the repo and create your branch from `main`
2. Update documentation if needed
3. Ensure tests pass
4. Submit PR with detailed description

## Coding Conventions
- Use meaningful variable names
- Follow existing code style
- Keep functions small and focused
- Maintain enterprise-grade code quality

## Questions?

Feel free to open an issue or reach out via GitHub:


16 .\docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/whiteboard.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/var/www/whiteboard/dist
    depends_on:
      - backend
      - frontend
    restart: unless-stopped


17 .\LICENSE
MIT License

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


18 .\README.md
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

## Project Structure
collaborative-whiteboard/
├── backend/
│ ├── src/
│ │ ├── index.js # Server entry point
│ │ ├── socketHandler.js # WebSocket event handlers
│ │ ├── roomManager.js # Room state management
│ │ ├── middleware/
│ │ │ └── auth.js # JWT authentication
│ │ ├── models/
│ │ │ ├── Drawing.js # Drawing schema
│ │ │ └── User.js # User schema
│ │ └── utils/
│ │ └── logger.js # Winston logging
│ ├── package.json
│ └── Dockerfile
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Toolbar.tsx # Tool selection UI
│ │ │ ├── PropertiesPanel.tsx
│ │ │ ├── Canvas.tsx # Konva canvas
│ │ │ └── UserCursors.tsx # Real-time cursors
│ │ ├── hooks/
│ │ │ ├── useSocket.ts # Socket.IO hook
│ │ │ └── useTheme.ts # Theme management
│ │ ├── types/
│ │ │ └── index.ts # TypeScript types
│ │ ├── utils/
│ │ ├── constants/
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── package.json
│ ├── vite.config.ts
│ └── Dockerfile
├── nginx/
│ └── whiteboard.conf # Nginx config
├── docker-compose.yml
├── .gitignore
├── .env.example
└── README.md

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker & Docker Compose (for containerized deployment)
- MongoDB (local or Atlas)
- Redis (optional, for scaling)

### Installation

1. **Clone the repository**

git clone https://github.com/pranavpanchal1326/collaborative-whiteboard.git
cd collaborative-whiteboard

text

2. **Set up environment variables**

cp .env.example .env

Edit .env with your configuration
text

3. **Install dependencies**

Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

text

4. **Run locally (development)**

Terminal 1 - Backend
cd backend
npm run dev

Terminal 2 - Frontend
cd frontend
npm run dev

text

Visit `http://localhost:5173`

### Docker Deployment

docker-compose up --build

text

Access the app at `http://localhost` (or your configured domain)

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

**Client to Server**
- `join-room`: Join a collaborative room
- `drawing`: Send drawing data
- `cursor-move`: Share cursor position
- `undo`: Request undo operation

**Server to Client**
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
cd backend
npm test

Frontend tests
cd frontend
npm test

text

## Deployment

### Production Build

Frontend
cd frontend
npm run build

Backend
cd backend
npm run build

text

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

## Author

## Acknowledgments

- Inspired by Figma FigJam, Miro, and Microsoft Whiteboard
- Built with modern web technologies and best practices
- Special thanks to the open-source community

---


19 .\SECURITY.md
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please contact **Kuldeep Sahoo** directly through GitHub instead of using the public issue tracker.

- GitHub:

We take security seriously and will respond promptly to all reports.

## Supported Versions

Currently supporting the latest release on the `main` branch.
import { io, Socket } from 'socket.io-client';

// Type declaration for Vite env
declare global {
  interface ImportMetaEnv {
    readonly VITE_SOCKET_URL?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling']
});

export const connectSocket = (roomId: string, username: string) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit('join-room', { roomId, username });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

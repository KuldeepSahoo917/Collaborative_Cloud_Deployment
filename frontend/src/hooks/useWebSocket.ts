import { useEffect, useState, useCallback } from 'react';
import { socket } from '../utils/socket';
import { User, DrawObject, CursorPosition } from '../types';

export const useWebSocket = (roomId: string, username: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [connected, setConnected] = useState(false);
  const [canvasObjects, setCanvasObjects] = useState<DrawObject[]>([]);

  useEffect(() => {
    socket.connect();
    socket.emit('join-room', { roomId, username });

    socket.on('connect', () => {
      setConnected(true);
      console.log('✅ Connected to server');
    });

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('❌ Disconnected from server');
    });

    socket.on('canvas-state', (state) => {
      console.log('📊 Canvas state received:', state.objects.length, 'objects');
      setCanvasObjects(state.objects || []);
    });

    socket.on('room-users', (roomUsers: User[]) => {
      console.log('👥 Room users:', roomUsers.length);
      setUsers(roomUsers);
    });

    socket.on('user-joined', (user: User) => {
      console.log('👋 User joined:', user.username);
      setUsers(prev => [...prev, user]);
    });

    socket.on('user-left', ({ userId, username: leftUsername }: { userId: string; username: string }) => {
      console.log('👋 User left:', leftUsername);
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    socket.on('draw', (object: DrawObject) => {
      console.log('🎨 Draw received:', object.type, object.id);
      setCanvasObjects(prev => [...prev, object]);
    });

    socket.on('update-object', (updatedObject: Partial<DrawObject> & { id: string }) => {
      console.log('🔄 Update object:', updatedObject.id);
      setCanvasObjects(prev =>
        prev.map(obj => obj.id === updatedObject.id ? { ...obj, ...updatedObject } : obj)
      );
    });

    socket.on('delete-object', (objectId: string) => {
      console.log('🗑 Delete object:', objectId);
      setCanvasObjects(prev => prev.filter(obj => obj.id !== objectId));
    });

    socket.on('clear-canvas', () => {
      console.log('🗑 Canvas cleared');
      setCanvasObjects([]);
    });

    socket.on('undo', (objectId: string) => {
      console.log('⬅️ Undo object:', objectId);
      setCanvasObjects(prev => prev.filter(obj => obj.id !== objectId));
    });

    socket.on('cursor-move', ({ userId, position }: { userId: string; position: CursorPosition }) => {
      setUsers(prev =>
        prev.map(user => user.id === userId ? { ...user, cursor: position } : user)
      );
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('canvas-state');
      socket.off('room-users');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('draw');
      socket.off('update-object');
      socket.off('delete-object');
      socket.off('clear-canvas');
      socket.off('undo');
      socket.off('cursor-move');
      socket.disconnect();
    };
  }, [roomId, username]);

  const emitDraw = useCallback((object: DrawObject) => {
    console.log('📤 Emitting draw:', object.type, object.id);
    // Add to local state immediately for instant feedback
    setCanvasObjects(prev => [...prev, object]);
    // Emit to server
    socket.emit('draw', object);
  }, []);

  const emitUpdateObject = useCallback((object: Partial<DrawObject> & { id: string }) => {
    socket.emit('update-object', object);
  }, []);

  const emitDeleteObject = useCallback((objectId: string) => {
    socket.emit('delete-object', objectId);
  }, []);

  const emitCursorMove = useCallback((position: CursorPosition) => {
    socket.emit('cursor-move', position);
  }, []);

  const emitClearCanvas = useCallback(() => {
    socket.emit('clear-canvas');
  }, []);

  const emitUndo = useCallback(() => {
    socket.emit('undo');
  }, []);

  return {
    users,
    connected,
    canvasObjects,
    emitDraw,
    emitUpdateObject,
    emitDeleteObject,
    emitCursorMove,
    emitClearCanvas,
    emitUndo
  };
};

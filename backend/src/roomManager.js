const { v4: uuidv4 } = require('uuid');

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  generateUserColor() {
    const colors = [
      '#0078d4', '#4a9eff', '#10b981', 
      '#f59e0b', '#ef4444', '#8b5cf6', 
      '#ec4899', '#06b6d4', '#84cc16'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  addUser(roomId, socketId, username) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        users: new Map(),
        canvas: { objects: [], version: 0 }
      });
    }

    const room = this.rooms.get(roomId);
    const user = {
      id: socketId,
      username,
      color: this.generateUserColor(),
      cursor: { x: 0, y: 0 },
      joinedAt: new Date()
    };

    room.users.set(socketId, user);
    return user;
  }

  removeUser(roomId, socketId) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      room.users.delete(socketId);
    }
  }

  getRoomUsers(roomId) {
    if (this.rooms.has(roomId)) {
      return Array.from(this.rooms.get(roomId).users.values());
    }
    return [];
  }

  getRoomUserCount(roomId) {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId).users.size;
    }
    return 0;
  }

  updateUserCursor(roomId, socketId, position) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      if (room.users.has(socketId)) {
        const user = room.users.get(socketId);
        user.cursor = position;
        return user;
      }
    }
    return null;
  }

  getCanvasState(roomId) {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId).canvas;
    }
    return { objects: [], version: 0 };
  }

  addObject(roomId, object) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      room.canvas.objects.push(object);
      room.canvas.version++;
    }
  }

  updateObject(roomId, updatedObject) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      const index = room.canvas.objects.findIndex(obj => obj.id === updatedObject.id);
      if (index !== -1) {
        room.canvas.objects[index] = {
          ...room.canvas.objects[index],
          ...updatedObject
        };
        room.canvas.version++;
      }
    }
  }

  deleteObject(roomId, objectId) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      room.canvas.objects = room.canvas.objects.filter(obj => obj.id !== objectId);
      room.canvas.version++;
    }
  }

  clearCanvas(roomId) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      room.canvas.objects = [];
      room.canvas.version++;
    }
  }

  undo(roomId) {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId);
      const lastObject = room.canvas.objects.pop();
      if (lastObject) {
        room.canvas.version++;
        return lastObject;
      }
    }
    return null;
  }

  deleteRoom(roomId) {
    this.rooms.delete(roomId);
  }

  getAllRoomStats() {
    const stats = [];
    this.rooms.forEach((room, roomId) => {
      stats.push({
        roomId,
        userCount: room.users.size,
        objectCount: room.canvas.objects.length,
        version: room.canvas.version
      });
    });
    return stats;
  }
}

module.exports = RoomManager;

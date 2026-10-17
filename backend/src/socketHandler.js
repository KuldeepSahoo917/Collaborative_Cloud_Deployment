const RoomManager = require('./roomManager');
const logger = require('./utils/logger');

const roomManager = new RoomManager();

function socketHandler(io) {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    socket.on('join-room', ({ roomId, username }) => {
      try {
        socket.join(roomId);
        socket.username = username || `User${Math.floor(Math.random() * 1000)}`;
        socket.roomId = roomId;

        const user = roomManager.addUser(roomId, socket.id, socket.username);
        const canvasState = roomManager.getCanvasState(roomId);
        
        socket.emit('canvas-state', canvasState);
        socket.to(roomId).emit('user-joined', user);
        
        const users = roomManager.getRoomUsers(roomId);
        socket.emit('room-users', users);

        logger.info(`${socket.username} joined room ${roomId}, canvas has ${canvasState.objects.length} objects`);
      } catch (error) {
        logger.error('Error joining room:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Handle drawing events
    socket.on('draw', (data) => {
      if (!socket.roomId) {
        logger.warn('Draw event received but no room assigned');
        return;
      }
      
      try {
        logger.info(`📝 Draw event: type=${data.type}, id=${data.id}, room=${socket.roomId}`);
        
        // Broadcast to other users in the room
        socket.to(socket.roomId).emit('draw', {
          ...data,
          userId: socket.id
        });

        // Add to room manager
        roomManager.addObject(socket.roomId, data);
        
        const roomState = roomManager.getCanvasState(socket.roomId);
        logger.info(`✅ Object added. Room now has ${roomState.objects.length} objects`);
      } catch (error) {
        logger.error('❌ Error handling draw:', error);
      }
    });

    // Handle remote drawing (from other users)
    socket.on('remote-draw', (data) => {
      if (!socket.roomId) return;
      
      logger.info(`🔄 Remote draw event: type=${data.type}, id=${data.id}`);
      roomManager.addObject(socket.roomId, data);
    });

    socket.on('update-object', (data) => {
      if (!socket.roomId) return;

      try {
        logger.info(`🔄 Update object: id=${data.id}`);
        
        socket.to(socket.roomId).emit('update-object', {
          ...data,
          userId: socket.id
        });

        roomManager.updateObject(socket.roomId, data);
      } catch (error) {
        logger.error('Error updating object:', error);
      }
    });

    socket.on('delete-object', (objectId) => {
      if (!socket.roomId) return;

      try {
        logger.info(`🗑 Delete object: id=${objectId}`);
        
        socket.to(socket.roomId).emit('delete-object', objectId);
        roomManager.deleteObject(socket.roomId, objectId);
      } catch (error) {
        logger.error('Error deleting object:', error);
      }
    });

    socket.on('cursor-move', (position) => {
      if (!socket.roomId) return;

      try {
        const user = roomManager.updateUserCursor(socket.roomId, socket.id, position);
        if (user) {
          socket.to(socket.roomId).emit('cursor-move', {
            userId: socket.id,
            username: socket.username,
            position,
            color: user.color
          });
        }
      } catch (error) {
        logger.error('Error updating cursor:', error);
      }
    });

    socket.on('clear-canvas', () => {
      if (!socket.roomId) return;

      try {
        roomManager.clearCanvas(socket.roomId);
        io.to(socket.roomId).emit('clear-canvas');
        logger.info(`🗑 Canvas cleared in room ${socket.roomId}`);
      } catch (error) {
        logger.error('Error clearing canvas:', error);
      }
    });

    socket.on('undo', () => {
      if (!socket.roomId) return;

      try {
        const lastObject = roomManager.undo(socket.roomId);
        if (lastObject) {
          io.to(socket.roomId).emit('undo', lastObject.id);
          logger.info(`⬅️ Undo: removed object ${lastObject.id}`);
        }
      } catch (error) {
        logger.error('Error handling undo:', error);
      }
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);

      if (socket.roomId) {
        try {
          roomManager.removeUser(socket.roomId, socket.id);

          socket.to(socket.roomId).emit('user-left', {
            userId: socket.id,
            username: socket.username
          });

          const usersCount = roomManager.getRoomUserCount(socket.roomId);
          if (usersCount === 0) {
            roomManager.deleteRoom(socket.roomId);
            logger.info(`Room ${socket.roomId} deleted (empty)`);
          }
        } catch (error) {
          logger.error('Error handling disconnect:', error);
        }
      }
    });
  });
}

socketHandler.getRoomStats = () => {
  return roomManager.getAllRoomStats();
};

module.exports = socketHandler;

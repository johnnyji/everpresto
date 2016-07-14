export default (io) => {
  const collections = io.of('/collections');

  collections.on('connection', (socket) => {
    socket.emit('connected');
  });

  collections.on('disconnect', (socket) => {
    socket.emit('disconnected');
  });

  return io;
};
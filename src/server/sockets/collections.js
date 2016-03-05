export default (io) => {
  const collections = io.of('/collections');

  collections.on('connection', (socket) => {
    socket.emit('connected');
  });

  collections.on('', (socket) => {
    
  });

  collections.on('disconnect', (socket) => {
    
  });

  return collections;
};
/**
 * Listens to any incoming socket messages of the `/documents` namespace
 * @param {Object} - The `io` object
 * @returns {Object} - The document `io` object
 */
export default (io) => {
  const documents = io.of('/documents');

  documents.on('connection', (socket) => {
    socket.emit('connected', 'YO! Documents IO is connected');
  });

  documents.on('disconnect', (socket) => {
    socket.emit('YO! Documents IO is gone!');
  });

  return documents;
};

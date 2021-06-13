const io = require('socket.io')();
const jwt = require('jsonwebtoken');

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, 'scrt', function (err, decoded) {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.decoded = decoded;
      next();
    });
  }
  else {
    next(new Error('Authentication error'));
  }
})
  .on('connection', function (socket) {
    // Connection is authenticated 
    socket.on('message', function (message) {
      io.emit('message', message);
    });
  });
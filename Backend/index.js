const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/userRouter');
const { chatRouter } = require('./routes/chatRouter');
const { messageRouter } = require('./routes/messageRouter');
const messageController = require('./controllers/messageController');
const { authMiddleware } = require('./middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
 next();
});

app.use('/user', userRouter);
app.use(authMiddleware);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

require('dotenv').config();

//Set up mongoose connection
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//console.log(db.db.listCollections);

const port = process.env.PORT || 8080;
var HOST = '62.44.101.120';
const httpServer = require('http').createServer(app);
httpServer.listen(port,HOST , () => console.log(`listening on ${HOST} ${port}`));

let socketsMap = new Map()
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

io.use(function (socket, next) {
  if (socket.handshake.query !== undefined && socket.handshake.query.token !== undefined) {
    try {
      jwt.verify(socket.handshake.query.token, 'scrt');
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  }
  else {
    next(new Error('Authentication error'));
  }
}).on('connection', (socket) => {
  console.log('a user connected');

  socket.on('setRoom', (roomId) => {
    const oldRoomId = socketsMap.get(socket.id);
    if (oldRoomId !== undefined && oldRoomId !== roomId) {
      socket.leave(oldRoomId);
    }
    socketsMap.set(socket.id, roomId)
    socket.join(roomId);
  });

  socket.on('message', (tokenId, roomId, message) => {
    messageController.create(roomId, tokenId, message, io);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

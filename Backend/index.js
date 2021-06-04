const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { userRouter } = require('./routes/userRouter');
const { chatRouter } = require('./routes/chatRouter');
const { messageRouter } = require('./routes/messageRouter');
const messageController = require('./controllers/messageController');
const { authMiddleware } = require('./middleware/authMiddleware');
const jwt_decode = require('jwt-decode');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/user', userRouter);
app.use('/chat',  chatRouter);
app.use('/message', messageRouter);
app.use(authMiddleware)
require('dotenv').config();

//Set up mongoose connection
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log(`listening on port ${port}`));

const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (tokenId, roomId, message) => {
    messageController.create(roomId, tokenId, message, io, roomId);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
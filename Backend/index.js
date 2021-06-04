const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken')
const { userRouter } = require('./routes/userRouter');
const { chatRouter } = require('./routes/chatRouter');
const { messageRouter } = require('./routes/messageRouter');
const messageController = require('./controllers/messageController');
const { authMiddleware } = require('./middleware/authMiddleware');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/user', userRouter);
app.use('/chat', authMiddleware, chatRouter);
app.use('/message', authMiddleware, messageRouter);
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
    const token = jwt_decode(tokenId);
    console.log(token);
    io.emit('message', roomId, token.name, message);
    messageController.create(roomId, token.id, message);
  });
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
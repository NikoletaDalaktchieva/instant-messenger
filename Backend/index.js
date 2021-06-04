var mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/userRouter');
const { chatRouter } = require('./routes/chatRouter');
const { messageRouter } = require('./routes/messageRouter');
const { authMiddleware } = require('./middleware/authToken');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use(authMiddleware);
require('dotenv').config();


//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log(`listening on port ${port}`));

//TODO move to chat service
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (roomNo, message) => {
    console.log(message);
    io.emit('message', roomNo, `${socket.id} said ${message}`);
  });

  // socket.on("message", (anotherSocketId, msg) => {
  //   socket.to(anotherSocketId).emit("message", anotherSocketId, msg);
  // });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
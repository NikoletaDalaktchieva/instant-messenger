const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/userRouter');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/user', userRouter);
require('dotenv').config();

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
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

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});
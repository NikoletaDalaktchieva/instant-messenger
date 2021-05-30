const express = require('express');
const cors = require('cors');
const { router } = require('./routes/user');
const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/user', router);


//Test function for correct work
app.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    console.log("work");
    res.json({ result: "OK" });
  });
});

const port = process.env.PORT || 8080;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log(`listening on port ${port}`));

//TODO move to chat service
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

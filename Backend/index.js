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
const mongoose = require('mongoose');
const { authService } = require('./middleware/authToken');
const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


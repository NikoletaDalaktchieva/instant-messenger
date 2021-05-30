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

app.get('/', (req, res) => {
    console.log("Users list works");
    res.json({ result: "OK" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
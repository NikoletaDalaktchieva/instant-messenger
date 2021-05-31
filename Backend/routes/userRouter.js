const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const userController = require("../controllers/userController");

//Check is user exist
router.post('/login', (request, respond) => {
  MongoClient.connect(process.env.DB_URL, function (err, db) {
    if (err) return respond.status(502).send();
    console.log("Database created!");
    var dbo = db.db(process.env.DB_NAME);
    dbo.collection(collection).findOne({ "user": request.body.user, "password": request.body.password }, function (err, res) {
      if (err) return respond.status(502).send();
      else if (res == null) respond.json({ result: 0, message: 'User not Found' });
      else return respond.json({ result: 1, id: res._id });
    });
  });
});


router.get('/', (request, respond) => {
  MongoClient.connect(process.env.DB_URL, function (err, db) {
    if (err) return respond.status(500).send();
    var dbo = db.db(process.env.DB_NAME);
    dbo.collection(collection).find({}).toArray(function (err, res) {
      if (err) return respond.status(500).send()
      else if (res == null) respond.json({ result: false, message: 'Users Not Found' });
      else respond.json({ result: true, users: res });
    });
    db.close();
  });
});

router.post('/', userController.create);

module.exports.userRouter = router;

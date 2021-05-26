const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const collection = 'users'
const dbName = 'messanger'

//Check is user exist
router.post('/login', (request, respond) => {
  new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) return respond.status(502).send();
      console.log('here');
      var dbo = db.db(dbName);
      dbo.collection(collection).findOne({ "user": request.body.user, "password": request.body.password }, function (err, res) {
        console.log(res)
        if (err) return respond.status(502).send();
        else if (res == null) respond.json({ result: 0, message: 'User not Found' });
        else return respond.json({ result: 1 });
      });
    });
  });
});


//Create user on register
router.post('/', (request, respond) => {
  console.log('here');
  new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) return respond.status(502).send();
      var dbo = db.db(dbName);
      dbo.collection(collection).insertOne(
        request.body
        , function (err, res) {
          if (err) return respond.status(502).send();
          else respond.json({ result: 1 });;
        });
      db.close();

    });
  });
});

module.exports.router = router;
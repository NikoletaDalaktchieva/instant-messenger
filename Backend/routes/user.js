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
      console.log("Database created!");
      var dbo = db.db(dbName);
      dbo.collection(collection).findOne({ "user": request.body.user, "password": request.body.password }, function (err, res) {
        if (err) return respond.status(502).send();
        else if (res == null) respond.json({ result: 0, message: 'User not Found' });
        else return respond.json({ result: 1, id: res._id });
      });
    });
  });
});


//Create user on register
router.post('/', (request, respond) => {
  new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) return respond.status(502).send();
      var dbo = db.db(dbName);
      dbo.collection(collection).insertOne(
        request.body
        , function (err, res) {
          if (err) return respond.status(502).send();
          else respond.json({ result: 1, id: res.insertedId });;
        });
      db.close();

    });
  });
});

module.exports.router = router;

router.get('/', (request, respond) => {
  MongoClient.connect(url, function (err, db) {
    if (err) return respond.status(500).send();
    var dbo = db.db(dbName);
    dbo.collection(collection).find({}).toArray(function (err, res) {
      if (err) return respond.status(500).send()
      else if (res == null) respond.json({ result: false, message: 'Users Not Found' });
      else respond.json({ result: true, users: [
        { id: 11, name: 'Dr Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
      ]});
    });
    db.close();
  });
});
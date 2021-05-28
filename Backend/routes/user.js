const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  new Promise((resolve, reject) => {
    res.json({result:"OK"});
  });
});
//localhost:8080/user/ -> OK
// install express,cors

router.post('/login', (req, res) => {
  new Promise((resolve, reject) => {
    console.log(new Date().toLocaleString())
    console.log(req.body)
    res.json({result:"OK"});
  });
});

module.exports.router = router;
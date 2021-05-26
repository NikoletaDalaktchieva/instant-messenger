const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  new Promise((resolve, reject) => {
    console.log(new Date().toLocaleString())
    console.log(req.body)
    if (req.body.user == '') {
      res.json({ result: 0, message : 'User not found' });
    } else {
      res.json({ result: 1 });
    }
  });
});

module.exports.router = router;
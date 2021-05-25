const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  new Promise((resolve, reject) => {
    console.log(new Date().toLocaleString())
    console.log(req.body)
    res.json({result:"OK"});
  });
});

module.exports.router = router;
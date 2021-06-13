const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    try {
      jwt.verify(token, process.env.tocken_secret);
      next();
    } catch (error) {
      res.status(401).json({ result: false, message: 'Your session has expired' });
    }
  }
}
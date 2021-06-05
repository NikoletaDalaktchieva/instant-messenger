const jwt = require('jsonwebtoken');

exports.authMiddleware = async function (req,res,next) {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    try {
      jwt.verify(token, 'scrt');
      next();
    } catch (error) {
      res.json({result: false, logout: true, message:'Your session has expired'});
    }
  }
}
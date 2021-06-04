const jwt = require('jsonwebtoken')

exports.authMiddleware = async function (req,res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    try {
      const verified = jwt.verify(token, 'secreett');
      next();
        
    } catch (error) {
      res.sendStatus(403).send('Your token has expired');
    }
    
  }
}
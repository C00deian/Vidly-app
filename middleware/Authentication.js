const jwt = require('jsonwebtoken'); 

module.exports = function authorizedUser(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log('No token provided');
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
      const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(400).send("Invalid token.");
  }
};

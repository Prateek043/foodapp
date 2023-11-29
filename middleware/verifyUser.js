const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    if(req?.headers?.authorization?.startsWith("Bearer")){
        accessToken=req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      status: 'fail',
      message: 'Authorization failed, Please login!',
    });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid token!',
      });
    }
    req.body.id = userData.id;
    next();
  });
}else{
    throw new Error("No Token is in The header");
}
};

module.exports = verifyUser;

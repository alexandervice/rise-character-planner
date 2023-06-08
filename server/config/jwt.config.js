const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

// this is all to enable us to authenticate users and allow or deny them to access cetain pages depending on if they are logged in or not
module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
      if(err) {
        res.status(401).json({verified: false});
      } else {
        next();
      }
    });
  }
}
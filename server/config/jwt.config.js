const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

// this is all to enable us to authenticate users and allow or deny them to access cetain pages depending on if they are logged in or not
module.exports = {
  authenticate: (req, res, next) => {
    const token = req.cookies.usertoken
    if (!token) {
      console.log("no token")
      return next() // bypass the authentication for now
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, secret);
      req.userId = data._id;
      req.userEmail = data.userEmail;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  }
}


// jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
//   if(err) {
//     res.status(401).json({verified: false});
//     // next();
//   } else {
//     next();
//   }
// });
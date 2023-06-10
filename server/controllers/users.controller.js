const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
// Will need this for login funcitonality
const bcrypt = require('bcrypt');

module.exports = {
  // register a new user

  register: async (req, res) => {
    try {
      const potentialUser = await User.findOne({ email: req.body.email }); // check if the user exists in database already
      if (potentialUser) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
      const newUser = await User.create(req.body);
      const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, secret, {expiresIn: "2h"}); // This is so the user _id isn't visible in the URL. We can make this expire later with "7d" or "24h"
      res.cookie("usertoken", userToken, {httpOnly: true}).json({
        message: "Success!",
        user: newUser
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
  ,
  // login an existing user
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password); // check for password and email matching
        if(passwordMatch){
          const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn: "2h"}); // can make this expire later with "7d" or "24h"
          res.cookie("usertoken", userToken, {httpOnly: true}).json({
            message: "Success!",
            user: user
          });
        }
        else {
          res.status(400).json({
            message: "Invalid login attempt" // don't clarify why, so hackers don't know the email was valid and password invalid. keep the message ambiguous 
          });
        }
      }
      else {
        res.status(400).json({
          message: "Invalid login attempt"
        });
      }
    }
    catch (err) {
      return res.json(err);
    }
  },

  // logout an existing user
  logout: (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
  }

}
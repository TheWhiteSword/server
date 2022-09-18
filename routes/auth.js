var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
var cors = require('cors')



dotenv.config();


function generateAccessToken(username) {
  const token = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}

router.post('/', function (req, res, next) {
  // ...
  const usernamepasswordEnv = process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD;

  const usernamepassword = req.body.user + req.body.pwd;

  if (usernamepassword === usernamepasswordEnv) {




    const token = generateAccessToken({ username: usernamepassword });
    // const token = generateAccessToken({ username: req.body.user });


    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({ message: "Successfully signed in !" });

  } else {
    res.status(400).send({
      message: 'This is an error!'
    });
  }



});

module.exports = router;



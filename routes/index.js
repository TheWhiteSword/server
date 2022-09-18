var express = require('express');
var router = express.Router();
var mysql = require('mysql');




var db = mysql.createPool({
  host: "localhost",
  user: "videoportaldbadmin",
  password: "Qwerty22",
  database: "videoportaldb",
  port: 3306
})

var con = mysql.createConnection({
  host: "localhost",
  user: "videoportaldbadmin",
  password: "Qwerty22"
});


router.get('/', function (req, res, next) {

  

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  const sqlInsert = "INSERT INTO videos (id, data) values ('10','data');"
  db.query(sqlInsert, (err, result) => {
    // res.send('respond with a resource');
  });
  res.render('index', { title: 'Express' });
});
module.exports = router;

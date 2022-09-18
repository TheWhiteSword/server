var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var upload = multer();

var { v4: uuidv4 } = require('uuid');

var jwt = require('jsonwebtoken');



var db = mysql.createPool({
    host: "localhost",
    user: "videoportaldbadmin",
    password: "Qwerty22",
    database: "videoportaldb",
    port: 3306
})


router.get('/', function (req, res, next) {

    const token = req.cookies.token;
    console.log(token);


    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(user);

        const usernamepassword = process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD;

        if (usernamepassword === user.username) {

            //   req.user = user;

            db.query("SELECT * FROM videos", function (err, result, fields) {
                if (err) throw err;
                res.send(result);
            });

        } else {
            res.clearCookie("token");
            return res.send(null);
        }

    } catch (err) {
        res.clearCookie("token");
        return res.send();
    }
});




router.post('/', upload.single('data'), function (req, res, next) {
    let query = "INSERT INTO videos (id, video) VALUES (?, ?);";
    let id = uuidv4();
    let video = req.file.buffer;
    // Creating queries
    db.query(query, [id, video], (err, rows) => {
        if (err) throw err;
        console.log("Row inserted");
    });
    res.json({ message: "Successfully uploaded" });
    // res.send('respond videos post with a resource');
});

module.exports = router;



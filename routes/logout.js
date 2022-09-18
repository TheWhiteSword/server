var express = require('express');
var cookie = require('cookie');

var router = express.Router();

router.get('/', function (req, res, next) {

    const serialized = cookie.serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(200).json({
        status: 'success',
        message: 'Logged out',
    });
});

module.exports = router;

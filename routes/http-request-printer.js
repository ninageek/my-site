var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('http-request-printer', {method: req.method, url: req.baseUrl, headers: req.headers, httpVersion: req.httpVersion, httpQuery: req.query});
});


module.exports = router;
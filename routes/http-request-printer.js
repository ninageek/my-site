var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    let reqObj = {
        method: req.method,
        url: req.baseUrl,
        headers: req.headers,
        httpVersion: req.httpVersion,
    };
    if (!isEmptyObject(req.query)) {
        reqObj = Object.assign({httpQuery: req.query}, reqObj);
    }
    res.render('http-request-printer', reqObj
    );
});

function isEmptyObject(obj) {
    return JSON.stringify(obj) === '{}';
}

module.exports = router;
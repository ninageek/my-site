var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('my-projects', {title: 'my projects'});
});

module.exports = router;
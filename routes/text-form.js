var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('text-form', {title: 'text-form'});
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    res.render('text-form', {title: 'text-form', userText: req.body.message});
});


module.exports = router;
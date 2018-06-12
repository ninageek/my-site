let express = require('express');
let router = express.Router();
const fetch = require('node-fetch');




router.get('/', function (req, res, next) {
    res.render('eulers-number', {
    });

});

module.exports = router;

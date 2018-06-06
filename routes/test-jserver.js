let express = require('express');
let router = express.Router();
const fetch = require('node-fetch');


router.get('/', function (req, res, next) {
    res.render('test-jserver', {
    });

});

router.post('/', function (req, res, next) {
    fetch('http://localhost:8080/api/test-jserver')
        .then(res => res.text())
        .then(responseString => res.render('test-jserver', {responseString: responseString}));
});


module.exports = router;
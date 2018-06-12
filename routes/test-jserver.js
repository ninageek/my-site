let express = require('express');
let router = express.Router();
const fetch = require('node-fetch');


router.get('/', function (req, res, next) {
    res.render('test-jserver', {
    });

});

router.post('/', function (req, res, next) {
    fetch('http://localhost:8080/api/test-jserver',{method:'GET', headers: {}, body: null, timeout: 2000})
        .then(res => res.text())
        .catch(error => res.render('test-jserver',{responseString:"Server is not available"}))
        .then(responseString => res.render('test-jserver', {responseString: responseString}))

});


module.exports = router;
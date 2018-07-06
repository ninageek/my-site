let express = require('express');
let router = express.Router();
const fetch = require('node-fetch');


router.get('/', function (req, res, next) {
    res.render('string-checker', {
        title: 'string-checker'
    });

});

router.post('/', function (req, res, next) {
    fetch('http://localhost:8080/api/string-checker', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstString: req.body.firstString, secondString: req.body.secondString})
    })
        .then(res => res.json())
        .then(json =>
            res.render('string-checker',
                {
                    response: json,
                    firstString: req.body.firstString,
                    secondString: req.body.secondString,
                    method:'POST'
                }))
        .catch(err =>
            console.log(err)
        );

});


module.exports = router;
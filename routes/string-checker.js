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
        .then(s =>
            res.render('string-checker',
                {
                    responseString: s.text(),
                    firstString: req.body.firstString,
                    secondString: req.body.secondString
                }))
        .catch(err =>
            console.log(err)
        );

});


module.exports = router;
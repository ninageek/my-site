let express = require('express');
let router = express.Router();
const fetch = require('node-fetch');




router.get('/', function (req, res, next) {
    res.render('eulers-number', {
    });

});

router.post('/', function (req, res, next) {
    fetch('http://localhost:8080/api/eulers-number', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({n: req.body.n})
    })
        .then(res => res.json())
        .then(json => {
            return res.render('eulers-number',
                {
                    response: json,
                    n: req.body.n,
                    method: 'POST'
                });
        })
        .catch(err =>
            console.log(err)
        );

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('text-form', {title: 'text-form'});
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    var userText = req.body.message;

    function splitMulti(str, tokens) {
        var tempChar = tokens[0];
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    var sentences = splitMulti(userText, ['.', '!', '?', '...']);
    res.render('text-form', {
        title: 'text-form',
        userText: req.body.message,
        wordTokens: req.body.message.split(' '),
        symbolTokens: req.body.message.split(/\s*/),
        sentences: sentences
    });

});


module.exports = router;
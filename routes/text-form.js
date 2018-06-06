let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('text-form', {title: 'text-form'});
});

router.post('/', function (req, res, next) {

    res.render('text-form',processRequest(req));

});

function processRequest(req) {
    console.log(req.body);
    let userText = req.body.message;
    let textToParse = req.body.message.replace(/\r\n?|\n/g, '').replace(/\s\s+/g, ' ').replace(/^ /, '').replace(/ $/, '');

    function splitMulti(str, tokens) {
        let tempChar = tokens[0];
        for (let i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    let sentences = splitMulti(userText, ['.', '!', '?', '...']);
    let wordTokens=textToParse.split(' ');
    let wordTokensCount = wordTokens.length;
    if(wordTokensCount ===1 && wordTokens[0]==="") wordTokensCount=0;


    return {
        title: 'text-form',
        userText: req.body.message,
        wordTokens: wordTokensCount,
        visibleSymbols: textToParse.split(/\s*/),
        sentences: sentences,
        method: "post"
    }
}

module.exports = router;
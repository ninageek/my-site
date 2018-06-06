let express = require('express');
let router = express.Router();


router.get('/', function (req, res, next) {
    res.render('my-projects', {title: 'my projects'});
});

module.exports = router;
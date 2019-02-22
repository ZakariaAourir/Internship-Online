var express = require('express');
var router = express.Router();


// home page - login page -
router.get('/', (req, res, next) => {
  res.render('index');

});

router.get('/register', (req, res, next) => {
  res.render('register');

});


module.exports = router;

var express = require('express');
var router = express.Router();


// home page - login page -
router.get('/users', (req, res, next) => {
  res.render('users');

});


module.exports = router;

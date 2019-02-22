var express = require('express');
var router = express.Router();


// home page - login page -
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/register', (req, res, next) => {
  res.render('register');

});
router.post('/register', (req, res, next) => {
  const name = req.body.name;
  const last = req.body.name2;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'First Name field is required').notEmpty();
  req.checkBody('last', 'Last Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').isEmail();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Password does not match').equals(req.body.password);

  let errors = req.validationErrors();
  if(errors){
    res.render('register', {
      errors: errors
    });
  }else{
    console.log("succes");
    return;
  }

});



module.exports = router;

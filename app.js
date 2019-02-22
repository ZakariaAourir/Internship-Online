const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

//creating routes
const index = require('./routes/index');
const users = require('./routes/users');

//init our app

const app = express();

const router = express.Router();
//port
const port = 3000;

//view

app.engine('handlebars', exphbs({defaultLayout: 'main'})); // means that all view layouts gonna have the same layout 'main'
app.set('view engine', 'handlebars');
//app.set('views',path.join(__dirname, 'views'));

// body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : false
}));
// express session

app.use(session({
  secret : 'secret',
  resave : false,
  saveUninitialized : true
}));
// express messages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express Validator

app.use(expressValidator({
  errorFormatter :(param, msg, value) => {
    const nameSpace = param.split('.')
    , root = nameSpace.shift()
    , formParam = root;
    while (nameSpace.length) {
      formParam += '[' + nameSpace.shift() + ']';
    }
    return {
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));
app.use('/', index);
app.use('/users', users);

// calling the port

app.listen(port, () => {
  console.log('server is running on port '+port);
});

module.exports = router;

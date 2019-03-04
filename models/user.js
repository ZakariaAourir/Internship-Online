const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passportapp', { useNewUrlParser: true });
const bcrypt = require('bcryptjs');

// user shcema

const UserSchema = mongoose.Schema({
  name:{
    type: String
  },
  username:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  }
});

const user = module.exports = mongoose.model('user', UserSchema);

module.exports.registerUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err){
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username};
  user.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  user.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

usersSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      next(error);
    } else {
      this.password = hash;
      return next();
    }
  });
});
usersSchema.methods.sanitize = function sanitize() {
  const { password, ...rest } = this.toObject();
  return rest;
};

const Users = mongoose.model('users', usersSchema);


module.exports = Users;

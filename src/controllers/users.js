const Users = require('../users');

exports.create = (req, res) => {
  const users = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  users.save().then(() => {
    res.status(201).send(users.sanitize());
  });
};

const User = require('../models/user');

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

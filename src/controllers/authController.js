const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newuser = db.User.create({ username, password: hash });
  if (!newuser) {
    return res.status(400).json({
      status: 'Fail',
      data: 'User registered failed'
    });
  }
  return res.status(201).json({
    status: 'Success',
    data: 'User registered successfully'
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({
    status: 'Fail',
    data: 'Invalid username or password'
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};

const User = require("../models/User.js");

exports.validateSignup = (req, res, next) => {
  req.sanitizeBody("name");
  req.sanitizeBody("email");
  req.sanitizeBody("password");

  req.checkBody("name", "Enter a name").notEmpty();
  req
    .checkBody("name", "Name must be between 4 and 10 characters")
    .isLength({ min: 4, max: 10 });

  req
    .checkBody("email", "Enter a valid email")
    .isEmail()
    .normalizeEmail();

  req.checkBody("password", "Enter a password").notEmpty();
  req
    .checkBody("password", "Password must be between 4 and 10 characters")
    .isLength({ min: 4, max: 10 });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(404).send(firstError);
  }

  next();
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await new User({ name, email, password });

  await User.register(user, password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(user);
  });
};

exports.signin = () => {};

exports.signout = () => {};

exports.checkAuth = () => {};

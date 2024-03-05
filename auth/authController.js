const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.send('signup');
}

module.exports.login_get = (req, res) => {
  res.send('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
//    const token = createToken(user._id);
//    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {

  const { username, password } = req.body;

  console.log(req.body)

  try {
    //original
    //const user = await User.login(email, password);
    //const token = createToken(user._id);
    //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    //res.status(200).json({ user: user._id });

    const account = await User.login(username, password);
    const token = createToken(account._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    console.log(token);



    let boom = {
      "token" : token,
      "id" : account._id,
      "email" : account.email,
      "username" : ""
    }

    console.log(boom);

    // Send the token as part of the response body
    res.status(200).json(boom);
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
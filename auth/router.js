'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
//passport.use('myBasic', basicStrategy);
//passport.use('jwt', jwtStrategy);

const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

console.log(config.JWT_SECRET);
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('myBasic', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user.apiRepr());
    res.json({authToken});
  }
);

router.post(
  '/refresh',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
  }
);

module.exports = {router};

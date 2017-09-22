'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = ('../config');

const createAuthToken = user => {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('myBasic', {session: false}),
  (res, req) => {
    console.log('trying login');
    console.log(req);
    const authToken = createAuthToken(req[0].user.apiRepr());
    res.json({authToken});
  }
);

router.post(
  '/refresh',
  passport.authenticate('jwt', {session: false}),
  (res, req) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
  }
);

module.exports = {router};

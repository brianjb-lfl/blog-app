'use strict';

const passport = require('passport');
const config = require('../config');
const {BasicStrategy} = require('passport-http');

const {User} = require('../models');


// Basic Strategy
const basicStrategy = new BasicStrategy((username, password, done) => {
  let user;
  User
    .findOne({username})
    .then(results => {
      user = results;

      if(!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Invalid login',
          //location: 'username'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if(!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Invalid login',
          //location: 'password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if(err.reason === 'LoginError') {
        console.log('error catch running');
        return done(null, false);
      }
      return done(err);
    });
});



module.exports = {basicStrategy};
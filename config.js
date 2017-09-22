'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/blog-app';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = 'MySecretKey';
exports.JWT_EXPIRY = '7d';
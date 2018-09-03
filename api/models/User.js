/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require("bcrypt-nodejs");
var Promise = require("bluebird");

module.exports = {
  datastore: "mongodb",
  schema: true,
  attributes: {
    firstName: {
      type: "string",
      required: true
    },

    lastName: {
      type: "string",
      required: true
    },

    email: {
      type: "string",
      unique: true,
      isEmail: true,
      required: true
    },

    phoneNo: {
      type: "number",
      required: true,
      unique: true
    },

    username: {
      type: "string",
      unique: true,
      required: true
    },

    password: {
      type: "string",
      required: true,
      minLength: 6
    }
  },
  customToJSON: function() {
    return _.omit(this, ["password"]);
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return cb(err);
        } else {
          user.password = hash;
        }
        cb();
      });
    });
  },

  comparePassword: function(password, user) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) {
          reject(err);
        }

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }
};

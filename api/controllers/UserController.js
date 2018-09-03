/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var passport = require("passport");

module.exports = {
  async login(req, res) {
    try {
      passport.authenticate("local", function(err, user, info) {
        if (err || !user) {
          return res.send({
            success: false,
            message: "incorrect username or password"
          });
        }
        req.session.authenticated = true;
        return res.send({
          status: "OK",
          username: user.username
        });
      })(req, res);
    } catch (err) {
      return res.serverError(err);
    }
  },

  async signup(req, res) {
    try {
      if (req.body.password != req.body.conPassword) {
        return res.send({ success: false, message: "Password mismatch" });
      }

      var allowedParameter = [
        "firstName",
        "lastName",
        "email",
        "phoneNo",
        "username",
        "password"
      ];

      var data = _.pick(req.body, allowedParameter);
      await User.create(data, function(err, createdDta) {
        if (err) {
          return res.send({ success: false, message: "fsfs" });
        } else {
          return res.json({
            data: createdDta,
            success: true
          });
        }
      });
    } catch (err) {
      return res.send({ message: err });
    }
  }
};

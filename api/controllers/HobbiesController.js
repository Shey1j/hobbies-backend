/**
 * HobbiesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const accountSid = "ACa9c22fe280014aa7b233dcf0b9e80395";
const authToken = "ed572430a5d658ccc44091f34ee55aad";
const client = require("twilio")(accountSid, authToken);

var api_key = "27ea50e141ba1e331b3e121ec5b7c956-a4502f89-ecc259d1";
var domain = "sandbox562cb79cf3f7432681d683eba2018af6.mailgun.org";
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

module.exports = {
  async CreateHobbies(req, res) {
    try {
      var allowedParameter = ["hobby", "username"];
      var items = _.pick(req.body, allowedParameter);
      await Hobbies.create(items, function(err, createdData) {
        if (err) {
          return res.send({
            success: false,
            message: "There was an error in adding the hobbies"
          });
        } else {
          client.messages
            .create({
              body: "You have added a hobby" + req.body.hobby,
              to: "+2348104046686",
              from: "+14092045243"
            })
            .then(message => console.log(message.sid))
            .done();

          var data = {
            from:
              "myHobbies <postmaster@sandbox562cb79cf3f7432681d683eba2018af6.mailgun.org>",
            to: "seyi.juliana@gmail.com",
            subject: "Hobbies",
            text: "You have added a new hobby: " + req.body.hobby
          };

          mailgun.messages().send(data, function(error, body) {
            console.log(body);
          });
          return res.json({
            data: createdData,
            success: true
          });
        }
      });
    } catch (err) {
      return res.send({ message: err.message });
    }
  },

  async ListHobbies(req, res) {
    try {
      var allowedParameter = ["hobby", "username"];

      var list = await Hobbies.find({
        where: { username: req.body.username }
      });

      let items = {
        list,
        success: true
      };
      return res.json(items);
    } catch (err) {
      return res.send({ message: err.message });
    }
  },

  async deleteHobbies(req, res) {
    try {
      await Hobbies.destroy({ id: req.body.id }, function(err) {
        if (err) {
          return res.send({ success: false, message: err.message });
        }
        client.messages
          .create({
            body: "You just deleted a hobby",
            to: "+2348104046686",
            from: "+14092045243"
          })
          .then(message => console.log(message.sid))
          .done();
        var data = {
          from:
            "myHobbies <postmaster@sandbox562cb79cf3f7432681d683eba2018af6.mailgun.org>",
          to: "seyi.juliana@gmail.com",
          subject: "Hobbies",
          text: "You just deleted a hobby"
        };

        mailgun.messages().send(data, function(error, body) {
          console.log(body);
        });
        return res.json({
          data: createdData,
          success: true
        });
      });
    } catch (err) {
      return res.send({ success: false, message: err.message });
    }
  }
};

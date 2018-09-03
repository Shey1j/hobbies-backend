/**
 * Hobbies.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "mongodb",
  schema: true,

  attributes: {
    username: {
      type: "string"
    },

    hobby: {
      type: "string"
    }
  }
};

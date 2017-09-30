var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var kittySchema = new Schema({
  name: {
    type: String
  },
}, {
  collection: 'kitty'
});
kittySchema.methods.speak = function () {
  var greeting = this.name ?
    "Meow! My name is " + this.name :
    "I don't have a name";
  console.log(greeting);
};
exports.kittySchema = kittySchema;
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
kittySchema.pre('init', function (next) {
  console.log('A new kitten is about to be initialized from the db');
  next();
});
kittySchema.pre('validate', function (next) {
  console.log('%s is about to be validated', this.name);
  next();
});
kittySchema.pre('save', function (next) {
  console.log('%s is about to be saved', this.name);
  next();
});
kittySchema.pre('remove', function (next) {
  console.log('%s is about to be removed', this.name);
  next();
});
kittySchema.post('init', function (doc) {
  console.log('%s has been initialized from the db', doc.name);
});
kittySchema.post('validate', function (doc) {
  console.log('%s has been validated', doc.name);
});
kittySchema.post('save', function (doc) {
  console.log('%s has been saved', doc.name);
});
kittySchema.post('remove', function (doc) {
  console.log('%s has been removed', doc.name);
});
exports.kittySchema = kittySchema;
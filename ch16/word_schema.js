var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var wordSchema = new Schema({
  word: {type: String, index: 1, required:true, unique: true},
  first: {type: String, index: 1},
  last: String,
  size: Number,
  letters: [String],
  stats: {
    vowels:Number, consonants:Number},
  charsets: [{ type: String, chars: [String]}]
}, {collection: 'word_stats'});
wordSchema.methods.startsWith = function(letter){
  return this.first === letter;
};
wordSchema.pre('init', function (next) {
  console.log('Doc newword is about to be initialized from the db');
  next();
});
wordSchema.pre('validate', function (next) {
  console.log('%s is about to be validated', this.word);
  next();
});
wordSchema.pre('save', function (next) {
  console.log('%s is about to be saved', this.word);
  console.log('Setting size to %d', this.word.length);
  this.size = this.word.length;
  next();
});
wordSchema.pre('remove', function (next) {
  console.log('%s is about to be removed', this.word);
  next();
});
wordSchema.post('init', function (doc) {
  console.log('%s has been initialized from the db', doc.word);
});
wordSchema.post('validate', function (doc) {
  console.log('%s has been validated', doc.word);
});
wordSchema.post('save', function (doc) {
  console.log('%s has been saved', doc.word);
});
wordSchema.post('remove', function (doc) {
  console.log('%s has been removed', doc.word);
});
exports.wordSchema = wordSchema;
//console.log("Required Paths: ");
//console.log(wordSchema.requiredPaths());
//console.log("Indexes: ");
//console.log(wordSchema.indexes());
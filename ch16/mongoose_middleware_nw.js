var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected');
  var Words = db.model('Words', wordSchema);
  Words.schema.pre('init', function (next) {
    console.log('a new word is about to be initialized from the db');
    next();
  });
  Words.schema.pre('validate', function (next) {
    console.log('%s is about to be validated', this.word);
    next();
  });
  Words.schema.pre('save', function (next) {
    console.log('%s is about to be saved', this.word);
    console.log('Setting size to %d', this.word.length);
    this.size = this.word.length;
    next();
  });
  Words.schema.pre('remove', function (next) {
    console.log('%s is about to be removed', this.word);
    next();
  });
  Words.schema.post('init', function (doc) {
    console.log('%s has been initialized from the db', doc.word);
  });
  Words.schema.post('validate', function (doc) {
    console.log('%s has been validated', doc.word);
  });
  Words.schema.post('save', function (doc) {
    console.log('%s has been saved', doc.word);
  });
  Words.schema.post('remove', function (doc) {
    console.log('%s has been removed', doc.word);
  });
  var newWord = new Words({
    word: 'newword',
    first: 'n',
    last: 'd',
    size: 'newword'.length,
  });
  console.log("\nSaving: ");
  newWord.save(function (err, newWord) {
    if (err) return console.error(err);
    console.log("\nFinding: ");
    Words.findOne({
      word: 'newword'
    }, function (err, doc) {
      if (err) return console.error(err);
      console.log("\nRemoving: ");
      // mongoose.disconnect();
      doc.remove(function (err) {
        if (err) return console.error(err);
        mongoose.disconnect();
      });
    });
  });
});
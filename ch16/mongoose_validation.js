var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  console.log('Connected');
  setTimeout(function () {
    mongoose.disconnect();
  }, 3000);
});

Words.schema.path('word').validate(function (value) {
  return value.length > 0;
}, "Word is Too Small");
Words.schema.path('word').validate(function (value) {
  return value.length < 20;
}, "Word is Too Big");

mongoose.connection.once('open', function () {
  var newWord = new Words({
    word: 'supercalifragilisticexpialidocious',
    first: 's',
    last: 's',
    size: 'supercalifragilisticexpialidocious'.length,
  });
  newWord.save(function (err) {
    console.log(err.errors.word.message);
    console.log(String(err.errors.word));
    console.log(err.errors.word.type);
    console.log(err.errors.word.path);
    console.log(err.errors.word.value);
    console.log(err.name);
    console.log(err.message);
    mongoose.disconnect();
  });
});
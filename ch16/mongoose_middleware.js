var mongoose = require('mongoose');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected');
  var wordSchema = require('./word_schema.js').wordSchema;
  var Words = db.model('Words', wordSchema);
  console.log("\nCreating new doc: ");
  var newWord = new Words({
    word: 'newword',
    first: 'n',
    last: 'd',
    size: 0
  });
  console.log(newWord);
  console.log("\nSaving: ");
  newWord.save(function (err, newWord, numAffected) {
    if (err) return console.error(err);
    console.log("Number of rows affected: " + numAffected);
    console.log(newWord);
    console.log("\nFinding: ");
    Words.findOne({
      word: 'newword'
    }, function (err, doc) {
      if (err) return console.error(err);
      console.log(doc);
      console.log("\nRemoving: ");
      doc.remove(function (err) {
        if (err) return console.error(err);
        mongoose.disconnect();
      });
    });
  });
});
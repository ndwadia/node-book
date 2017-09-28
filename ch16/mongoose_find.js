var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  setTimeout(function () {
    mongoose.disconnect();
  }, 10000);
});

mongoose.connection.once('open', function () {
  var query = Words.count().where('first').in(['a', 'e', 'i', 'o', 'u']);
  query.where('last').in(['a', 'e', 'i', 'o', 'u']);
  query.exec(function (err, count) {
    console.log("\nThere are " + count +
      " words that start and end with a vowel");
  });
  var query2 = Words.count().where('first').in(['a', 'e', 'i', 'o', 'u']);
  query2.where('last').in(['a', 'e', 'i', 'o', 'u']);
  query2.find().limit(20).sort({
    size: -1
  });
  query2.exec(function (err, docs) {
    console.log("\nTop 20 words that start and end with a vowel, sorted by size: ");
    for (var i in docs) {
      console.log(docs[i].word);
    }
  });
  var query3 = Words.find();
  query3.mod('size', 2, 0);
  query3.where('size').gt(6);
  query3.skip(5);
  query3.limit(20);
  query3.select({
    word: 1,
    size: 1
  });
  query3.exec(function (err, docs) {
    console.log("\nWords with even lengths and longer than 6 letters, skip 5, limit 20: ");
    for (var i in docs) {
      console.log(JSON.stringify(docs[i]));
    }
  });
});
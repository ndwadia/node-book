var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  console.log('Connected');
});

mongoose.connection.once('open', function () {
  var newWord1 = {
    word: 'gracifaction',
    first: 'g',
    last: 'n',
    size: 12,
    letters: ['g', 'r', 'a', 'c', 'i', 'f', 'c', 'o', 'n'],
    stats: {
      vowels: 5,
      consonants: 7
    }
  };
  var newWord2 = {
    word: 'gooogled',
    first: 'g',
    last: 'd',
    size: 8,
    letters: ['g', 'o', 'l', 'e', 'd'],
    stats: {
      vowels: 4,
      consonants: 4
    }
  };
  var newWord3 = new Words({
    word: 'selfiefied',
    first: 's',
    last: 'd',
    size: 10,
    letters: ['s', 'e', 'l', 'f', 'i', 'd'],
    stats: {
      vowels: 5,
      consonants: 5
    }
  });
  console.log("Is Document New? " + newWord3.isNew);
  newWord3.save(function (err, doc) {
    console.log("\nSaved document: " + doc);
  });
  Words.create([newWord1, newWord2], function (err) {
    for (var i = 1; i < arguments.length; i++) {
      console.log("\nCreated document: " + arguments[i]);
    }
    mongoose.disconnect();
  });
});
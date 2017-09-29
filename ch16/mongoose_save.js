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
  var query = Words.findOne().where('word', 'boik');
  query.exec(function (err, doc) {
    console.log("Is Document New? " + doc.isNew);
    console.log("\nBefore Save: ");
    console.log(doc.toJSON());
    doc.set('word', 'book');
    doc.set('letters', ['b', 'o', 'k']);
    doc.set('charsets','');
    console.log("\nModified Fields: ");
    console.log(doc.modifiedPaths());
    doc.save(function (err) {
      if (err) {
        console.log(err.message);
        mongoose.disconnect();
        return;
      }
      Words.findOne({
        word: 'book'
      }, function (err, doc) {
        if (err) {
          console.log(err.message);
          mongoose.disconnect();
          return;
        }
        console.log("\nAfter Save: ");
        console.log(doc.toJSON());
        mongoose.disconnect();
      });
    });
  });
});
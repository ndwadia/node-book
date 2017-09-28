var mongoose = require('mongoose');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

var promise = mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  console.log(db.name);
  console.log(db.collection('word_stats').collectionName);
  mongoose.disconnect();
});
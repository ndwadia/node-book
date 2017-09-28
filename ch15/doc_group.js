var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function (err, db) {
  if (err) {
    console.log(err.message);
    return;
  }
  var myDB = db.db("words");
  myDB.collection("word_stats", groupItems);
  setTimeout(function () {
    db.close();
  }, 3000);
});

function groupItems(err, words) {
  if (err) {
    console.log(err.message);
    return;
  }
  words.aggregate([
    { $match: { first: "o" } },
    { $group: { _id: "$size", Count: { $sum: 1 } } }
  ]).toArray(function (err, docs) {
    console.log(docs);
  });
  words.aggregate([
    { $match: { size: { $gt: 10 } } },
    { $group: { _id: "$first", Count: { $sum: 1 } } }
  ]).toArray(function (err, docs) {
    console.log(docs);
  });
  words.aggregate([
    { $match: { $and: [{ first: { $in: ["i", "o"] } }, { size: { $gt: 10 } }] } },
    { $group: { _id: "$first", Total: { $sum: { $add: ["$stats.vowels", "$stats.consonants"] } } } }
  ]).toArray(function (err, docs) {
    console.log(docs);
  });
}
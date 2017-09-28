var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/admin";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function (err, db) {
  var newDB = db.db("words");
  newDB.collections(function (err, collectionObjects) {
    console.log("Initial collections: ");
    console.log(collectionObjects);
    newDB.createCollection("word_stats", function (err, collection) {
      newDB.collections(function (err, collectionObjects) {
        console.log("Collections after creation: ");
        console.log(collectionObjects);
        newDB.dropCollection("word_stats", function (err, results) {
          newDB.collections(function (err, collectionObjects) {
            console.log("Collections after deletion: ");
            console.log(collectionObjects);
            db.close();
          });
        });
      });
    });
  });
});
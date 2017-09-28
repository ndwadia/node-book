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
  var myDB = db.db("astro");
  myDB.collection("nebulae", function (err, nebulae) {
    nebulae.find(function (err, items) {
      items.toArray(function (err, itemArr) {
        console.log("Before Delete: ");
        console.log(itemArr);
        nebulae.remove({ type: "planetary" }, function (err, results) {
          console.log("Delete:\n " + results);
          nebulae.find(function (err, items) {
            items.toArray(function (err, itemArr) {
              console.log("After Delete: ");
              console.log(itemArr);
              db.close();
            });
          });
        });
      });
    });
  });
});
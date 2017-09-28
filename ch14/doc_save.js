var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/astro";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function(err, db) {
  var myDB = db.db("astro");
  myDB.collection("nebulae", function(err, nebulae){
    nebulae.findOne({type: "Super Nova"}, function(err, item){
      console.log("Before Save: ");
      console.log(item);
      item.info = "Some New Info";
      nebulae.save(item, {w:1}, function(err, results){
        nebulae.findOne({_id:item._id}, function(err, savedItem){
          console.log("After Save: ");
          console.log(savedItem);
          db.close();
        });
      });
    });
  });
});
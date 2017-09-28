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
    nebulae.find({type:"supernova"}, function(err, items){
      items.toArray(function(err, itemArr){
        console.log("Before Modify: ");
        console.log(itemArr);
        nebulae.findAndModify({type:"supernova"}, [['name', 1]], 
            {$set: {type:"Super Nova", "updated":true}},
            {w:'majority', new:true}, function(err, doc){
          console.log("After Modify: ");
          console.log(doc);
          db.close();
        });
      });
    });
  });
});
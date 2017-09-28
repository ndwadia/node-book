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
    nebulae.find({type:"planetary"}, function(err, items){
      items.toArray(function(err, itemArr){
        console.log("Before Update: ");
        console.log(itemArr);
        nebulae.update({type:"planetary", $isolated:1}, 
                       {$set:{type:"Planetary", updated:true}},
                       {upsert:false, multi:true, w:1}, 
                       function(err, results){
          nebulae.find({type:"Planetary"}, function(err, items){
            items.toArray(function(err, itemArr){
              console.log("After Update: ");
              console.log(itemArr);
              db.close();
            });
          });
        });
      });
    });
  });
});
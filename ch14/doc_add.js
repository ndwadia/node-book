var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/admin";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
function addObject(collection, object){
  collection.insert(object, function(err, result){
    if(!err){
      console.log("Inserted : ");
      console.log(result);
    }
  });
}
MongoClient.connect(uri, options, function(err, db) {  
  var myDB = db.db("astro");
  if (myDB.collection("nebulae")) {
    myDB.dropCollection("nebulae");
    console.log('Dropped nebulae collection');
  }
  myDB.createCollection("nebulae", function(err, nebulae){
    addObject(nebulae, {ngc:"NGC 7293", name:"Helix",
      type:"planetary",location:"Aquila"});
    addObject(nebulae, {ngc:"NGC 6543", name:"Cat's Eye",
      type:"planetary",location:"Draco"});
    addObject(nebulae, {ngc:"NGC 1952", name: "Crab",
      type:"supernova",location:"Taurus"});
    db.close();
  });
});
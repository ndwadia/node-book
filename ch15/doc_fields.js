var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function(err, db) {
  var myDB = db.db("words");
  myDB.collection("word_stats", limitFields);
  setTimeout(function(){
    db.close();
  }, 3000);
});
function limitFields(err, words){
  words.findOne({word:"won\'t"}, {fields:{letters:0}}, 
                function(err, item){
    console.log("Excluding fields object: ");
    console.log(JSON.stringify(item, null, 2));
  });
  words.findOne({word:"won\'t"}, {fields:{word:1,size:1,stats:1}},
                function(err, item){
    console.log("Including fields object: ");
    console.log(JSON.stringify(item, null, 2));
  });
}
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
  myDB.collection("word_stats", distinctValues);
  setTimeout(function(){
    db.close();
  }, 3000);
});
function distinctValues(err, words){
  words.distinct('size', function(err, values){
    console.log("\nSizes of words: ");
    console.log(values);
  });
  words.distinct('first', {last:'t'}, function(err, values){
    console.log("\nFirst letters of words ending in t: ");
    console.log(values);
  });
  words.distinct('stats.vowels', function(err, values){
    console.log("\nNumbers of vowels in words: ");
    console.log(values);
  });
}
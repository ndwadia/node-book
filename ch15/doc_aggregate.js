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
  myDB.collection("word_stats", aggregateItems);
  setTimeout(function(){
    db.close();
  }, 3000);
});
function aggregateItems(err, words){
  words.aggregate([{$match: {first:{$in:['a','e','i','o','u']}}},
                   {$group: {_id:"$first", 
                             largest:{$max:"$size"}, 
                             smallest:{$min:"$size"}, 
                             total:{$sum:1}}},
                   {$sort: {_id:1}}],
              function(err, results){
    console.log("Largest and smallest word sizes for " +
                "words beginning with a vowel: ");
    console.log(results);
  });
  words.aggregate([{$match: {size:4}},
                   {$limit: 5},
                   {$project: {_id:"$word", stats:1}}],
              function(err, results){
    console.log("Stats for 5 four letter words: ");
    console.log(results);
  });
  words.aggregate([{$group: {_id:"$first", average:{$avg:"$size"}}},
                    {$sort: {average:-1}},
                    {$limit: 5}],
              function(err, results){
    console.log("Letters with largest average word size: ");
    console.log(results);
  });
}
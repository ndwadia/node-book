var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  console.log('Connected');
});
mongoose.connection.once('open', function(){
  Words.find({word:/goo.*/}, function(err, docs){
    console.log("Before delete: ");
    for (var i in docs){
      console.log(docs[i].word);
    }
    var query = Words.remove();
    query.where('word').regex(/goog.*/);
    query.exec(function(err, results){
      console.log("\n%d Documents Deleted.", results);
      Words.find({word:/goo.*/}, function(err, docs){
        console.log("\nAfter delete: ");
        for (var i in docs){
          console.log(docs[i].word);
        }
        mongoose.disconnect();
      });
    });
  });
});
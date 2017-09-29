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
  Words.find({word:/grati.*/}, function(err, docs){
    console.log("Before update: ");
    for (var i in docs){
      console.log(docs[i].word + " : " + docs[i].size);
    }
    var query = Words.update({}, {$set: {size: 13}});
    query.setOptions({multi: true});
    query.where('word').regex(/grati.*/);
    query.exec(function(err, results){
      Words.find({word:/grat.*/}, function(err, docs){
        console.log("\nAfter update: ");
        for (var i in docs){
          console.log(docs[i].word + " : " + docs[i].size);
        }
        mongoose.disconnect();
      });
    });
  });
});
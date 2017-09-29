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
  var query = Words.findOne().where('word', 'gratifactions');
  query.exec(function(err, doc){
    console.log("Before Delete: ");
    console.log(doc);
    doc.remove(function(err, deletedDoc){
      Words.findOne({word:'gratifactions'}, function(err, doc){
        console.log("\nAfter Delete: ");
        console.log(doc);
        mongoose.disconnect();
      });
    });
  });
});
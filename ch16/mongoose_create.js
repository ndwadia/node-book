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
  var newWord1 = new Words({
    word:'gracifaction',
    first:'g', last:'n', size:12,
    letters: ['g','r','a','c','i','f','c','o','n'],
    stats: {vowels:5, consonants:7}
  });
  console.log("Is Document New? " + newWord1.isNew);
  newWord1.save(function(err, doc){
    console.log("\nSaved document: " + doc);
  });
  var newWord2 = { word:'gooogled',
    first:'g', last:'d', size:8,
    letters: ['g','o','l','e','d'],
    stats: {vowels:4, consonants:4}
  };
  var newWord3 = {
    word:'selfiefy',
    first:'s', last:'e', size:8,
    letters: ['s','e','l','f','i','y'],
    stats: {vowels:3, consonants:5}
  };
  Words.create([newWord2, newWord3], function(err){
    for(var i=1; i<arguments.length; i++){
      console.log("\nCreated document: " + arguments[i]);      
    }
    mongoose.disconnect();
  });
});
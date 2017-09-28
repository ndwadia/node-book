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
  myDB.collection("word_stats", sortItems);
  setTimeout(function(){
    db.close();
  }, 3000);
});
function displayWords(msg, cursor, pretty){
  cursor.toArray(function(err, itemArr){
    console.log("\n"+msg);
    var wordList = [];
    for(var i=0; i<itemArr.length; i++){
      wordList.push(itemArr[i].word);
    }
    console.log(JSON.stringify(wordList, null, pretty));
  });
}
function sortItems(err, words){
  words.find({last:'w'}, function(err, cursor){
    displayWords("Words ending in w: ", cursor);
  });
  words.find({last:'w'}, {sort:{word:1}}, function(err, cursor){
    displayWords("Words ending in w sorted, asc: ", cursor);
  });
  words.find({last:'w'}, {sort:{word:-1}}, function(err, cursor){
    displayWords("Words ending in w sorted, desc: ", cursor);
  });
  words.find({first:'b'}, {sort:[['size',-1],['last',1]]}, 
             function(err, cursor){
    displayWords("B words sorted by size, desc then by last letter, asc: ", cursor);
  });
  words.find({first:'b'}, {sort:[['last',1],['size',-1]]}, 
             function(err, cursor){
    displayWords("B words sorted by last letter, asc then by size, desc: ", cursor);
  });
}
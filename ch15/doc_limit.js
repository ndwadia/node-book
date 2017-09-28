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
  myDB.collection("word_stats", limitFind);
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
function limitFind(err, words){
  words.count({first:'p'}, function(err, count){
    console.log("Count of words starting with p : " + count);
  });
  words.find({first:'p'}, function(err, cursor){
    displayWords("Words starting with p : ", cursor);
  });
  words.find({first:'p'}, {limit:5}, function(err, cursor){
    displayWords("Limiting words starting with p : ", cursor);
  });
}
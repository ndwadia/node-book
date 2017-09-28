var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/test";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function (err, db) {
  if (err) {
    console.log("Connection failed");
  } else {
    console.log("Connected to " + db.databaseName);
    console.log(db.options);
    var adminDb = db.admin();
    adminDb.listDatabases(function (err, databases) {
      if (err) {
        console.log('Error: ' + err.message);
      } else {
        console.log(databases);
        db.logout(function (err, result) {
          if (!err) {
            console.log("Logged out of " + db.databaseName);
          }
          db.close();
          console.log("Connection closed");
        });
      }
    });
  }
});
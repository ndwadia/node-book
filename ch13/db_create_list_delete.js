var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/admin";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function (err, db) {
  var adminDB = db.admin();
  adminDB.listDatabases(function (err, databases) {
    console.log("Before Add Database List: ");
    console.log(databases);
  });
  var newDB = db.db("newDB");
  newDB.createCollection("newColleciton", function (err, collection) {
    if (!err) {
      console.log("New Database and Collection Created");
      adminDB.listDatabases(function (err, databases) {
        console.log("After Add Database List: ");
        console.log(databases);
        db.db("newDB").dropDatabase(function (err, results) {
          if (!err) {
            console.log("Database dropped.");
            setTimeout(function () {
              adminDB.listDatabases(function (err, results) {
                var found = false;
                for (var i = 0; i < results.databases.length; i++) {
                  if (results.databases[i].name == "newDB") found = true;
                }
                if (!found) {
                  console.log("After Delete Database List: ");
                  console.log(results);
                }
                db.close();
              });
            }, 1);
          }
        });
      });
    }
  });
});
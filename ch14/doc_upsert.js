var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/astro";
var options = {
  ssl: true,
  replicaSet: 'Cluster0-shard-0',
  authSource: 'admin',
  keepAlive: 1,
  connectTimeoutMS: 30000
};
MongoClient.connect(uri, options, function (err, db) {
  var myDB = db.db("astro");
  myDB.collection("nebulae", function (err, nebulae) {
    nebulae.find({ type: "diffuse" }, function (err, items) {
      items.toArray(function (err, itemArr) {
        console.log("Before Upsert: ");
        console.log(itemArr);
        nebulae.update({ type: "diffuse" },
          {
            $set: {
              ngc: "NGC 3372", name: "Carina",
              type: "diffuse", location: "Carina"
            }
          },
          { upsert: true, w: 1, forceServerObjectId: false },
          function (err, results) {
            nebulae.find({ type: "diffuse" }, function (err, items) {
              items.toArray(function (err, itemArr) {
                console.log("After Upsert 1: ");
                console.log(itemArr);
                var itemID = itemArr[0]._id;
                nebulae.update({ _id: itemID },
                  {
                    $set: {
                      ngc: "NGC 3372", name: "Carina",
                      type: "Diffuse", location: "Carina"
                    }
                  },
                  { upsert: true, w: 1 }, function (err, results) {
                    nebulae.findOne({ _id: itemID }, function (err, item) {
                      console.log("After Upsert 2: ");
                      console.log(item);
                      db.close();
                    });
                  });
              });
            });
          });
      });
    });
  });
});
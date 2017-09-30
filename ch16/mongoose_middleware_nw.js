var mongoose = require('mongoose');
var kittySchema = require('./kitty_schema.js').kittySchema;
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected');
  var Kitten = db.model('Kitten', kittySchema);
  var newKitten = new Kitten({
    name: 'peggy'
  });
  newKitten.speak();
  console.log("\nSaving: ");
  newKitten.save(function (err, newKitten, numAffected) {
    if (err) return console.error(err);
    newKitten.speak();
    console.log("Number of rows affected: " + numAffected);
    console.log("\nFinding: ");
    Kitten.findOne({
      name: 'peggy'
    }, function (err, doc) {
      if (err) return console.error(err);
      console.log("\nRe-saving: ");
      doc.save(function (err, newKitten, numAffected) {
        if (err) return console.error(err);
        newKitten.speak();
        console.log("Number of rows affected: " + numAffected);
        console.log("\nRemoving: ");
        doc.remove(function (err) {
          if (err) return console.error(err);
          doc.speak();
          mongoose.disconnect();
        });
      });
    });
  });
});
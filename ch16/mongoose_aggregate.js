var mongoose = require('mongoose');
var wordSchema = require('./word_schema.js').wordSchema;
var Words = mongoose.model('Words', wordSchema);
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/words?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

mongoose.connect(uri, {
  useMongoClient: true,
}, function (err, db) {
  console.log('Connected');
  setTimeout(function () {
    mongoose.disconnect();
  }, 3000);
});
mongoose.connection.once('open', function () {
  Words.aggregate([{
        $match: {
          first: {
            $in: ['a', 'e', 'i', 'o', 'u']
          }
        }
      },
      {
        $group: {
          _id: "$first",
          largest: {
            $max: "$size"
          },
          smallest: {
            $min: "$size"
          },
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ],
    function (err, results) {
      console.log("\nLargest and smallest word sizes for " +
        "words beginning with a vowel: ");
      console.log(results);
    });
  var aggregate = Words.aggregate();
  aggregate.match({
    size: 4
  });
  aggregate.skip(4);
  aggregate.limit(5);
  aggregate.append({
    $project: {
      _id: "$word",
      stats: 1
    }
  });
  aggregate.exec(function (err, results) {
    console.log("\nStats for four letter words, skip 4, limit 5: ");
    console.log(results);
  });
  aggregate = Words.aggregate();
  aggregate.group({
    _id: "$first",
    average: {
      $avg: "$size"
    }
  });
  aggregate.sort('-average');
  aggregate.limit(5);
  aggregate.exec(function (err, results) {
    console.log("\nTop 5 letters with largest average word size: ");
    console.log(results);
  });
});
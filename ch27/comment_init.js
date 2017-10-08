var mongoose = require('mongoose');
var uri = "mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/comments?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
var connection = mongoose.connect(uri, {
  useMongoClient: true
});
require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');
var CommentThread = mongoose.model('CommentThread');
var Reply = mongoose.model('Reply');
var Photo = mongoose.model('Photo');
var Page = mongoose.model('Page');

function addPhoto(title, filename) {
  var comment = new CommentThread({
    title: title + " Comments"
  });
  comment.save(function (err, comment) {
    var photo = new Photo({
      title: title,
      filename: filename
    });
    photo.commentId = comment.id;
    photo.save(function () {
      console.log(title + " Saved.");
    });
  });
}
CommentThread.remove().exec(function () {
  Photo.remove().exec(function () {
    Page.remove().exec(function () {
      var comment = new CommentThread({
        title: "Photo Page Comments"
      });
      comment.save(function (err, comment) {
        var page = new Page({
          name: "Photos Page"
        });
        page.commentId = comment.id;
        page.save();
      });
      addPhoto('Strength', 'arch.jpg');
      addPhoto('Power', 'pyramid.jpg');
      addPhoto('Beauty', 'flower.jpg');
      addPhoto('Thoughtful', 'lake.jpg');
      addPhoto('Summer Fun', 'volcano.jpg');
      addPhoto('Sunsets', 'jump.jpg');
    });
  });
});;
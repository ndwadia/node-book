var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ReplySchema = new Schema({
  username: String,
  subject: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  body: String
}, {
  _id: true
});
ReplySchema.add({
  replies: [ReplySchema]
});

var CommentThreadSchema = new Schema({
  title: String
});
CommentThreadSchema.add({
  replies: [ReplySchema]
});

mongoose.model('Reply', ReplySchema);
mongoose.model('CommentThread', CommentThreadSchema);
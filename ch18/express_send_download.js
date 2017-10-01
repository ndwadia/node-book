var express = require('express');
var url = require('url');
var app = express();
app.listen(80);
app.get('/download/:name', function (req, res, nxt) {
  var fileName = req.params.name;
  res.sendFile(fileName, {
    maxAge: 1,
    root: './ch18/views/',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }, function (err) {
    if (err) {
      console.log("Error");
      nxt(err);
    } else {
      console.log("Sent " + fileName);
    }
  });
});
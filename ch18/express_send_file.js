var express = require('express');
var app = express();
app.listen(80);
app.get('/image', function (req, res, nxt) {
  res.sendFile('arch.jpg', {
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
      console.log("Success");
    }
  });
});
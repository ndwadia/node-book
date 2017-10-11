var mongoose = require('mongoose'),
  Word = mongoose.model('Word');
exports.getWords = function (req, res) {
  var sortField = getSortField(req);
  var query = Word.find();
  var skipNum = req.query.skip * 1;
  var limitNum = req.query.limit * 1;
  var containsStr = req.query.contains;
  if (containsStr.length > 0) {
    query.find({
      'word': new RegExp(req.query.contains, 'i')
    });
  }
  query.sort(sortField)
    .skip(skipNum)
    .limit(limitNum)
    .exec(function (err, word) {
      if (!word) {
        res.status(404).json({
          msg: 'Word Not Found.'
        });
      } else {
        res.status(200).json(word);
      }
    });
};

function getSortField(req) {
  var field = "word";
  if (req.query.sort == 'Vowels') {
    field = 'stats.vowels';
  } else if (req.query.sort == 'Consonants') {
    field = 'stats.consonants';
  } else if (req.query.sort == 'Length') {
    field = 'size';
  } else {
    field = req.query.sort;
    field = field.toLowerCase();
  }
  if (req.query.direction == 'desc') field = '-' + field;
  return field;
}
var mongoose = require('mongoose'),
    Page = mongoose.model('Page');
exports.getPage = function(req, res) {
  Page.findOne({ name: req.query.pageName })
  .exec(function(err, page) {
    if (!page){
      res.status(404).json({msg: 'Page Not Found.'});
    } else {
      res.status(200).json(page);
    }
  });
};
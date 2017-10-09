var mongoose = require('mongoose'),
  Product = mongoose.model('Product');
exports.getProduct = function (req, res) {
  Product.findOne({
      _id: req.query.productId
    })
    .exec(function (err, product) {
      if (!product) {
        res.status(404).json({
          msg: 'Product Not Found.'
        });
      } else {
        res.status(200).json(product);
      }
    });
};
exports.getProducts = function (req, res) {
  Product.find()
    .exec(function (err, products) {
      if (!products) {
        res.status(404).json({
          msg: 'Products Not Found.'
        });
      } else {
        res.status(200).json(products);
      }
    });
};
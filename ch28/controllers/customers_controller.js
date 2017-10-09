var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer'),
  Address = mongoose.model('Address'),
  Billing = mongoose.model('Billing');
exports.getCustomer = function (req, res) {
  Customer.findOne({
      userid: 'customerA'
    })
    .exec(function (err, customer) {
      if (!customer) {
        res.ststus(404).json({
          msg: 'Customer Not Found.'
        });
      } else {
        res.status(200).json(customer);
      }
    });
};
exports.updateShipping = function (req, res) {
  var newShipping = new Address(req.body.updatedShipping);
  Customer.update({
      userid: 'customerA'
    }, {
      $set: {
        shipping: [newShipping.toObject()]
      }
    })
    .exec(function (err, results) {
      if (err || results < 1) {
        res.status(404).json({
          msg: 'Failed to update Shipping.'
        });
      } else {
        res.status(200).json({
          msg: "Customer Shipping Updated"
        });
      }
    });
};
exports.updateBilling = function (req, res) {
  // This is where you could verify the credit card information
  // and halt the checkout if it is invalid. 
  var newBilling = new Billing(req.body.updatedBilling);
  Customer.update({
      userid: 'customerA'
    }, {
      $set: {
        billing: [newBilling.toObject()]
      }
    })
    .exec(function (err, results) {
      if (err || results < 1) {
        res.status(404).json({
          msg: 'Failed to update Billing.'
        });
      } else {
        res.status(200).json({
          msg: "Customer Billing Updated"
        });
      }
    });
};
exports.updateCart = function (req, res) {
  Customer.update({
      userid: 'customerA'
    }, {
      $set: {
        cart: req.body.updatedCart
      }
    })
    .exec(function (err, results) {
      if (err || results < 1) {
        res.status(404).json({
          msg: 'Failed to update Cart.'
        });
      } else {
        res.status(200).json({
          msg: "Customer Cart Updated"
        });
      }
    });
};
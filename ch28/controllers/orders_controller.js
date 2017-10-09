var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer'),
  Order = mongoose.model('Order'),
  Address = mongoose.model('Address'),
  Billing = mongoose.model('Billing');
exports.getOrder = function (req, res) {
  Order.findOne({
      _id: req.query.orderId
    })
    .exec(function (err, order) {
      if (!order) {
        res.status(404).json({
          msg: 'Order Not Found.'
        });
      } else {
        res.status(200).json(order);
      }
    });
};
exports.getOrders = function (req, res) {
  Order.find({
      userid: 'customerA'
    })
    .exec(function (err, orders) {
      if (!orders) {
        res.status(404).json({
          msg: 'Orders Not Found.'
        });
      } else {
        res.status(200).json(orders);
      }
    });
};
exports.addOrder = function (req, res) {
  var orderShipping = new Address(req.body.orderShipping);
  var orderBilling = new Billing(req.body.orderBilling);
  var orderItems = req.body.orderItems;
  var newOrder = new Order({
    userid: 'customerA',
    items: orderItems,
    shipping: orderShipping,
    billing: orderBilling
  });
  newOrder.save(function (err, results) {
    if (err) {
      res.status(500).json("Failed to save Order.");
    } else {
      Customer.update({
          userid: 'customerA'
        }, {
          $set: {
            cart: []
          }
        })
        .exec(function (err, results) {
          if (err || results < 1) {
            res.status(404).json({
              msg: 'Failed to update Cart.'
            });
          } else {
            res.status(200).json({
              msg: "Order Saved."
            });
          }
        });
    }
  });
};
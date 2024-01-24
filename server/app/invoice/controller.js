const { defineAbilityFor } = require("../../middlewares");
const Order = require("../order/model");

const show = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    // Find the order and populate the 'order_details' field
    const order = await Order
      .findOne({ _id: orderId, user: req.user._id })
      .populate('order_details');

    if (!order) {
      return res.status(404).json({
        error: 1,
        message: `Order not found for the user`,
      });
    }

    // Check user permissions
    const policy = defineAbilityFor(req.user);
    if (!policy.can('read', 'Invoice')) {
      return res.status(403).json({
        error: 1,
        message: `Invoice is not allowed to be shown.`,
      });
    }

    // Return the order with populated 'order_details'
    return res.json({
      data: order.toJSON({ virtuals: true }),
    });

  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  show,
};

  
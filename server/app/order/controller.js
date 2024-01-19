const { defineAbilityFor } = require("../../middlewares");
const Product = require("../product/model");
const CartItem = require("../cart-item/model");
const DeliveryAddress = require("../deliveryAddress/model");
const Order = require("./model");
const OrderDetail = require("./orderDetailModel");

const clearUserCart = async (userId) => {
  try {
      
    // Find cart items
    const userCartItems = await CartItem.find({ user: userId });

    // Delete each cart item
    for (const cartItem of userCartItems) {
      await CartItem.deleteOne({ _id: cartItem._id });
    }

    console.log(`User's cart cleared successfully`);
  } catch (error) {
    console.error('Error clearing user cart:', error.message);
    throw error;
  }
};

const store = async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ error: 1, message: 'User not authenticated' });
    }
    const payload = req.body;
    console.log('Received Order Data:', payload);

    if (payload.cart_items && payload.cart_items.length > 0) {
      let items = await CartItem.find({ _id: { $in: payload.cart_items } });

      if (items.length > 0) {
        payload.cart_items = items.map((cartItem) => cartItem._id);
      } else {
        delete payload.cart_items;
      }
    }

    if (payload.delivery_address && payload.delivery_address.length > 0) {
      let address = await DeliveryAddress.find({ _id: { $in: payload.delivery_address } });

      if (address.length > 0) {
        payload.delivery_address = address.map((address) => address._id);
      } else {
        delete payload.delivery_address;
      }
    }

    // Check user permissions
    let policy = defineAbilityFor(req.user);
    if (!policy.can('create', Order)) {
      return res.json({
        error: 1,
        message: `You're not allowed to create orders.`,
      });
    }

    // Create a new order
    let newOrder = new Order(payload);

    // Save the order
    await newOrder.save();

    // Create order details
    const orderDetails = [];
    for (const cartItemId of payload.cart_items) {
      const cartItem = await CartItem.findById(cartItemId);
      for (const product of cartItem.products) {
        const productDocument = await Product.findById(product.productId);
        const orderDetail = await OrderDetail.create({
          user: req.user._id,
          product: productDocument._id,
          quantity: product.quantity,
          price: productDocument.price,
          orderID: newOrder._id,
        });
        orderDetails.push(orderDetail._id);
      }
    }

    // Update order 
    newOrder.order_details = orderDetails;

    // update order_details field
    await newOrder.save();

    // Clear cart    
    await clearUserCart(req.user._id);

    // Include order details in the response
    const populatedOrder = await Order.findById(newOrder._id).populate('order_details');
    
    console.log('Order created', populatedOrder);

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder,
    });

  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};


const index = async(req, res, next) => {
    try {
        console.log('User ID:', req.user._id);
        let {skip = 0, limit = 10} = req.query;
        let count = await Order.find({user: req.user._id}).countDocuments();
        let orders =
            await Order.find({user: req.user._id})
            .find({user: req.user._id})
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .populate('order_details')
            .sort('-createdAt');
        return res.json({
        data: orders.map(order => order.toJSON({virtuals: true})),
        count
        })
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

module.exports = {
    store,
    index
}
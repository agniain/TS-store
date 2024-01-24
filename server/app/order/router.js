const router = require('express').Router();
const passport = require('passport');
const { police_check } = require('../../middlewares');
const orderController = require('./controller');

router.post(
    '/orders', 
    passport.authenticate('bearer', { session: false }),
    police_check('create', 'Order'),
    orderController.store
);

router.get(
    '/orders/users',
    passport.authenticate('bearer', { session: false }), 
    police_check('read', 'Order'),
    orderController.view
);

router.get(
    '/orders',
    passport.authenticate('bearer', { session: false }), 
    police_check('read', 'Order'),
    orderController.index
);

module.exports = router;
const { subject } = require("@casl/ability");
const { defineAbilityFor } = require("../../middlewares");
const DeliveryAddress = require("./model");

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;

        let address = new DeliveryAddress({...payload, user: user._id});
        let policy = defineAbilityFor(req.user);
        if(!policy.can('create', address)) {
            return res.json({
                error: 1,
                message: `You're not allowed to modify.`
            });
        }
        await address.save();
        console.log('address created')
        return res.json(address);

    }   catch (err) {
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

const update = async (req, res, next) => {
    try{
        let {_id, ...payload} = req.body;
        let { id } = req.params;
        let address = await DeliveryAddress.findById(id);
        if (!address) {
            return res.json({
              error: 1,
              message: `Delivery address not found!`,
            });
          }
        
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user_id});
        let policy = defineAbilityFor(req.user);
        if(!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: `You're not allowed to modify!`
            });
        }
        
        address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true});
        if (!address) {
            return res.json({
              error: 1,
              message: `Failed to update`,
            });
          }
        console.log('address updated')
        res.json(address)
    } catch (error) {
        throw error
    }
}


const index = async (req, res, next) => {
    try {
        console.log("user ID for address:", req.user._id);
        const address = await DeliveryAddress.findOne({ user: req.user._id })

        if (!address) {
            return res.json({
                error: 1,
                message: "Address not found for the user"
            });
        }

        // check user permissions
        let policy = defineAbilityFor(req.user);
        if (!policy.can('read', address)) {
            return res.json({
                error: 1,
                message: "You're not allowed to read the address"
            });
        }

        return res.json(address);

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        let { id } = req.params;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user_id});
        let policy = defineAbilityFor(req.user);
        if(!policy.can('delete', subjectAddress)) {
            return res.json({
                error: 1,
                message: `You're not allowed to delete.`
            });
        }
        
        address = await DeliveryAddress.findByIdAndDelete(id);
        console.log('address deleted')
        return res.json(address);
    }   catch (error) {
        throw error
    }
}

module.exports = {
    store,
    index,
    update,
    destroy,
}
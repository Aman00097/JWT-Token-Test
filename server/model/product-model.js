const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    packSize: {
        type: String,
    },
    mrp: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

module.exports = mongoose.model('Product', productSchema);
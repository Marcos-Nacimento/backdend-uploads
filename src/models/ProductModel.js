const mongoose = require('mongoose');
const pagination = require('mongoose-aggregate-paginate-v2');

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 40,
    },
    price: {
        type: String,
        required: true,
    },
    categorie: {
        type: String,
        required: true,
        max: 40,
    },
    image: {
        type: String,
        required: true,
    },
});

ProductModel.plugin(pagination);

module.exports = mongoose.model('product', ProductModel);
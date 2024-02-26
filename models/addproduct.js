const mongoose = require('mongoose');


const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    cetagory: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
          type: String,
          required: true
    }

});


module.exports = mongoose.model("Prodect", ProductSchema);
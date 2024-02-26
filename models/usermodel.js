const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true

    },

    Password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
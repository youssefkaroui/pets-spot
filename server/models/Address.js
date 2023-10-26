const { Schema } = require('mongoose');

const addressSchema = new Schema(
    {
    line_one: {
        type: String,
        required: true,
    },
    line_two: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true,
    },

});


module.exports = addressSchema;

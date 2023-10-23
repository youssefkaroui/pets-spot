const { Schema, model} = require('mongoose');

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
    zipcode: {
        type: String,
        required: true,
    }
});


module.exports = addressSchema;

//Listing
/* {
    dateCreated: String
    dateEnds: String
    description: string
    pet: [Pet]
    postedBy: [User]
    active: boolean
} */

const { Schema, model } = require('mongoose');

const user = require('./User');
const pet = require ('./Pet');


const listingSchema = new Schema (

    {
        dateCreated: {
            type: String,
            required: true,
            unique: true
        },
        dateEnds: {
            type: String,
            required: true,
            unique:true

        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        pet: [petSchema],
        postedBy: [User],
        active: {
            type: Boolean,
            required: true
        }
        
    
    }
);

module.exports = listingSchema;


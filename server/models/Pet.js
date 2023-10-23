
// Pets
/* {
    img string
    species string
    name string
    age int
    sex string
    breed string
    temperament string
    child-friendly boolean
    medical-history []
}
*/

const { Schema, model } = require('mongoose');

const petSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        species: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            require: true,

        },
        sex: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            unique: true
        },
        breed: {
            type: String,
            required: true,
        },
        temperment: {
            type: String,
            required: true,
        },
        childFriendly: {
            type: Boolean,
            required: true
        },
        description: {
            type: String,
            required: true,
            unique: true
        },
        active: {
            type: Boolean,
            required: true
        },
        dateCreated: {
            type: String,
            required: true,
            unique: true
        },

    }
);

const Pet = model('Pet', petSchema)

module.exports = Pet;

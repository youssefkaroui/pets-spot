
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
const medicalHistorySchema = require('./MedicalHistory')

const petSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
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
            // required: true, KEEPING BUT FIGURING OUT IMPLEMENTATION
            unique: true
        },
        breed: {
            type: String,
            required: true,
        },
        temperament: {
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
        },
        active: {
            type: Boolean,
            default: true,
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now,
            get: (dateCreated) => dateCreated.toLocaleDateString('en-US')
        },
        medicalHistory: medicalHistorySchema
    },
    {
        toJSON: {
            getters: true,
          },
    }
);

const Pet = model('Pet', petSchema)

module.exports = Pet;

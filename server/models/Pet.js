
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
            unique: true
        },
        specie: {
            type: String,
            required: true, 

        },
        age: {
            type: Integer,
            require: true,

        },
        sex: {
            type: String,
            required: true,

        },
        image: {
            type: ??? ,
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
        medicalHistory: [medicalHistorySchema],
    }
);

module.exports = petSchema;

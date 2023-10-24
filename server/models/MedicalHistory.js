const {Schema} = require('mongoose')


const medicalHistorySchema = new Schema (
   { 
    allergies: {
        type: [String]
    },
    vaccinated: {
        type: Boolean,
    },
    spayedNeutered: {
        type: Boolean,
    }
},
{
    toJSON: {
        getters: true,
    }
}
)

module.exports = medicalHistorySchema
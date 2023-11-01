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
            required: true,
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
        medicalHistory: medicalHistorySchema,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
          },
          toObject: {
            virtuals: true
        }
    }
);

// petSchema.virtual('owner', {
//     ref: "User",
//     localField: '_id',
//     foreignField: 'petsForAdoption._id',
//     options: {
//         match: {_id: this._id}
//     }
// })

const Pet = model('Pet', petSchema)

module.exports = Pet;

// //Listing
// /* {
//     dateCreated: String
//     dateEnds: String
//     description: string
//     pet: [Pet]
//     postedBy: [User]
//     active: boolean
// } */

// const { Schema, model } = require('mongoose');

// const Pet = require ('./Pet');


// const listingSchema = new Schema (

//     {
//         dateCreated: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         // dateEnds: {
//         //     type: String,
//         //     required: true,
//         //     unique:true
//         // },
//         description: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         pet: {
//             type: Schema.Types.ObjectId,
//             ref: 'Pet'
//         },
//         active: {
//             type: Boolean,
//             required: true
//         }
//     }
// );

// const Listing = model('Listing', listingSchema)

// module.exports = Listing;


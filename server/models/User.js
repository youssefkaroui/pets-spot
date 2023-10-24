// User model
/* {
    name string, trim
    password bcrypt 
    email string unique 
    location string
    petsForAdoption [Pets.Id]
}
method {
    bcrypt
    hash password
    dehash password - compare
}
*/
const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

//  imports shema for Pets.js
const Pet = require('./Pet');
const  addressSchema = require ('./Address');

const userSchema = new Schema (
    {
        username: {
            type: String,
            // required: true,
            // unique: true
        },
        email: {
            type: String,
            // required: true,
            // unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String, 
            // required: true
        },
        
        address: addressSchema,

        petsForAdoption: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet',
        }],
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
  
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;

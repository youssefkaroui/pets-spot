
const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

//  imports shema for Pets.js
const Pet = require('./Pet');
const  addressSchema = require ('./Address');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String, 
            required: true
        },
        
        address: addressSchema,

        petsForAdoption: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet',
        }],
        petsFollowed: [{
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }],
        // messages: [{
        //     //messagesSchema: {
        //     message: "hello"
        //      sentBy: User._id
        //      sendDate: Date
        // }
        // }]
    },
    {
        toJSON: {
          virtuals: true,
        },
        toObject: {
            virtuals: true
        }
    }
);

userSchema.virtual('petCount').get(function() {
    return this.petsForAdoption.length
})

userSchema.virtual('followingCount').get(function() {
    return this.petsFollowed.length
})
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

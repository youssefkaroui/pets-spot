const { AuthenticationError} = require('apollo-server-express');
const {User, Pet, Listing} = require('../models');

const resolvers = {
/*
Queries: me => User.findOne({_id})
        me => Pet.findOne({_id})
        search => Listing.findOne({_id})
*/
Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({_id: context.user._id})
            //Maybe populate pets in same query
        }
    },
    getListings: async (parent, args, context) => {
        return Listing.find({}).limit(10);
    },
    // search: async (parent, args) => {
    //     return Listing.find({}).limit(20)
    //     //??????????????????????????????????????????
    // }
},
Mutation: {
/* 
Mutation: login({ email, password }) \/
          addUser({username, email, password}) \/
          addPet({formData}) \/
          addListing({formData}, context.user) \/
          updateUser({formData}, context.user) \/
          updatePet({formData}, context.user)
          updateListing({formData}, context.user)
          deletePet({_id}, context.user)
          deleteListing({_id}, context.user)
*/
    //login({ email, password })
    login: async (parent, {email, password}) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError(
                "Oops"
            )}
        const correctPW = await user.isCorrectPassword(password)
        if (!correctPW) {
            throw new AuthenticationError("password is incorrect")
        }
        
        const token = signToken(user);

        return {token, user}
    },
    //addUser({username, email, password})
    addUser: async (parent, {username, email, password}) => {
        const user = await User.create({ username, email, password});

        const token = signToken(user)

        return { token, user }
    },
    // addPet({formData})
    addPet: async (parent, { formData }) => {
        const pet = await Pet.create({ formData })

        return pet
    },
    //addListing({formData}, context.user)
    addListing: async (parent, {dateEnds, description, petData }) => {
        const listing = await Listing.create({
            ...petData,
            dateEnds: dateEnds,
            description: description
        })

        return listing
    }
}
}

module.exports = resolvers
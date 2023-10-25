const { AuthenticationError } = require("apollo-server-express");
const { User, Pet } = require("../models");
const {signToken} = require('../utils/auth')
const resolvers = {
  /*
Queries: me => User.findOne({_id})
        me => Pet.findOne({_id})
        search => Listing.findOne({_id})
*/
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        //Maybe populate pets in same query
      }
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Oops");
      }
      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
        throw new AuthenticationError("password is incorrect");
      }

      const token = signToken(user);

      return { token, user };
    },
    //addUser({username, email, password})
    addUser: async (parent, {userInput}) => {
      
        console.log(userInput)
        const user = await User.create({
       ...userInput
      });
      const token = signToken(user);
      
      return { token, user };
    },
    // addPet({formData})
    addPet: async (parent, { pet }) => {
      const newPet = await Pet.create({ ...pet });
      console.log(newPet);

      return newPet;
    },
    updateUser: async (parent, { user }) => {
      console.log(user)
      const updatedUser = User.findOneAndUpdate(
          {_id: user._id},
          { $set: {...user}},
          {runValidators: true, new: true}
          )
      return updatedUser
  },
  },
};

module.exports = resolvers;

const { AuthenticationError } = require("apollo-server-express");
const { User, Pet } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    //Query all data on a logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "petsForAdoption"
        );
      }
      throw new AuthenticationError("You are not logged in");
    },

    // search: async (parent, args) => {
    //     return Listing.find({}).limit(20)
    //     //??????????????????????????????????????????
    // }
  },
  Mutation: {
    //Logs in an existing user
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
    //Create a new User document
    addUser: async (parent, { userInput }) => {
      console.log(userInput);
      const user = await User.create({
        ...userInput,
      });
      const token = signToken(user);

      return { token, user };
    },
    // Create Pet document and add reference ID to logged in User
    addPet: async (parent, { pet }, context) => {
      const newPet = await Pet.create({ ...pet });
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { petsForAdoption: newPet._id } },
        { new: true }
      ).populate("petsForAdoption");

      return updateUser;
    },
    //Updates the User
    updateUser: async (parent, { user }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { ...user } },
        { runValidators: true, new: true }
      );
      return updatedUser;
    },
    //Updates a Pet document if User that owns it is logged in
    updatePet: async (parent, { pet }, context) => {
     
        const updatePet = await Pet.findOneAndUpdate(
        { _id: pet._id },
        { $set: { ...pet } },
        { runValidators: true, new: true }
      );
      const updatedUser = User.findOne({ _id: context.user._id }).populate(
        "petsForAdoption"
      );
      return updatedUser;
    },
    //Delete a Pet document and remove reference from logged in User
    deletePet: async (parent, { petId }, context) => {
      const deletedPet = await Pet.findOneAndDelete({ _id: petId });
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { petsForAdoption: petId } },
        { runValidators: true, new: true }
      ).populate("petsForAdoption");

      return updatedUser;
    },
  },
};

module.exports = resolvers;

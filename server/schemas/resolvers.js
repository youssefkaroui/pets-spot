const { AuthenticationError } = require("apollo-server-express");
const { User, Pet, Image } = require("../models");
const { signToken } = require("../utils/auth");
const { connect } = require("mongoose");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


// NICETOHAVE: Messages field to User

const resolvers = {
  Query: {
    //Query all data on a logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "petsForAdoption"
        ).populate('petsFollowed');

      }
      throw new AuthenticationError("You are not logged in");
    },

    search: async (parent, { searchInput }) => {
      //finds a pet by search parameters
      const searchedPets = await Pet.find({ ...searchInput });
      return searchedPets; //Expect array of objects
    },
    petProfile: async (parent, { petId }) => {
      //gets ONE pet by its ID
      const getPetProfile = await Pet.findOne({ _id: petId }).populate("owner");
      return getPetProfile;
    },
    donate: async (parent, args, context) => {
      const {donation} = args

      const paymentIntent = await stripe.paymentIntents.create({
        amount: donation,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      })

      
      return {clientSecret: paymentIntent.client_secret}
    
    }
  },
  Mutation: {
    //Logs in an existing user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //checks if user with that email exists
      if (!user) {
        throw new AuthenticationError("Oops");
      }
      //checks if password is correct
      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
        throw new AuthenticationError("password is incorrect");
      }
      //creates a token for signed in user
      const token = signToken(user);

      return { token, user };
    },
    //Create a new User document
    addUser: async (parent, { userInput }) => {
      const user = await User.create({
        ...userInput,
      });
      const token = signToken(user);

      return { token, user };
    },
    // Create Pet document and add reference ID to logged in User
    addPet: async (parent, { pet }, context) => {
      if (context.user) {
        const newPet = await Pet.create({ ...pet, owner: context.user._id });
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { petsForAdoption: newPet._id } },
          { new: true }
        );

        return newPet.populate("owner");
      }
      throw new AuthenticationError(
        "You must be logged in to create a listing"
      );
    },
    //Updates the User
    updateUser: async (parent, { user }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { ...user } },
          { runValidators: true, new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You must be logged in to update your details"
      );
    },
    //Updates a Pet document if User that owns it is logged in
    updatePet: async (parent, { pet }, context) => {
      if (context.user) {
        const updatePet = await Pet.findOneAndUpdate(
          { _id: pet._id },
          { $set: { ...pet } },
          { runValidators: true, new: true }
        );
        //returns user with pet
        const user = User.findOne({ _id: context.user._id }).populate(
          "petsForAdoption"
        );
        return user;
      }
      throw new AuthenticationError(
        "You must be logged in to update a listing"
      );
    },
    //Delete a Pet document and remove reference from logged in User
    deletePet: async (parent, { petId }, context) => {
      if (context.user) {
        const deletedPet = await Pet.findOneAndDelete({ _id: petId });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { petsForAdoption: petId } },
          { runValidators: true, new: true }
        ).populate("petsForAdoption");

        return updatedUser;
      }
      throw new AuthenticationError("You must be logged in to do that");
    },
    followPet: async (parent, { petId }, context) => {
      if (context.user) {
        // Conditionally adds/removes a pet from petsFollowed array
        const user = await User.findOneAndUpdate({ _id: context.user._id }, [
          {
            $set: {
              petsFollowed: {
                $cond: {
                  if: { $in: [petId, "$petsFollowed"] },
                  then: {
                    $filter: {
                      input: "$petsFollowed",
                      cond: { $ne: ["$$this", petId] },
                    },
                  },
                  else: { $concatArrays: ["$petsFollowed", [petId]] },
                },
              },
            },
          },
        ], {runValidators: true, new: true}).populate('petsFollowed');
    
        return user;
      }
    },
  },
};

module.exports = resolvers;

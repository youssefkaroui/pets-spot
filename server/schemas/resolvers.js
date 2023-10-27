const { AuthenticationError } = require("apollo-server-express");
const { User, Pet } = require("../models");
const { signToken } = require("../utils/auth");
const { connect } = require("mongoose");

//typeDef: Add state to addressSchema ---- DONE
//typeDef: Add petsFollowed to User ---- DONE
// Query for search ---- DONE
// Query for petProfile --- DONE???
// Mutation for followPet

// NICETOHAVE: Messages field to User

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

    search: async (parent, { searchInput }) => {
      const searchedPets = await Pet.find({ ...searchInput });
      console.log(searchedPets);
      return searchedPets; //Expect array of objects
    },
    petProfile: async (parent, { petId }) => {
      //gets ONE User's pet,
      //  const getPetProfile = await User.findOne(
      //   {petsForAdoption: [petId]}
      //   ).populate({
      //     path: 'Pet',
      //     match: {_id: petId},
      //     strictPopulate: false,
      //   })
      const getPetProfile = await Pet.find({ _id: petId }).populate("owner");
      return getPetProfile;
    },
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
        const updatedUser = User.findOne({ _id: context.user._id }).populate(
          "petsForAdoption"
        );
        return updatedUser;
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

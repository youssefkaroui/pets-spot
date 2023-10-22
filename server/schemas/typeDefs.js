const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        address: String
        petsForAdoption: [Pet, Listing]
    }

    type Pet {
        _id: ID
        name: String
        species: String
        breed: String
        age: Int
        sex: String
        image: String
        temperament: String
        childFriendly: Boolean
        medicalHistory: medicalHistory
    }

    type Listing {
        _id: ID
        dateCreated: String
        dateEnds: String
        description: String
        active: Boolean
        pet: Pet
        postedBy: User
    }

    type Auth {
        token: ID!
        user: User
    }
    input userForm {
        username: String
        email: String
        address: String
    }
    input petData {
        name: String
        species: String
        breed: String
        age: Int
        sex: String
        image: String
        temperament: String
        childFriendly: Boolean
        medicalHistory: {}
    }
    input searchForm {
        name: String
        species: String
        breed: String
        age: Int
        sex: String
        childFriendly: Boolean
    }
    type Query {
        me: User
        getListings: [Listing]
        searchListings(input: searchForm): [Listing]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(user: userForm): Auth
        addPet(pet: petData): Pet
        addListing(dateEnds: String, description: String, pet: petData): Listing
        updateUser(user: userForm, password: String): User
        updatePet(pet: petData): Pet
        updateListing(??): Listing
        deletePet(petId: ID!): Pet
        deleteListing(listingId: ID!): Listing
    }

`
module.exports = typeDefs;

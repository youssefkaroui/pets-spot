const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    address: Address
    petsForAdoption: [Pet]
  }
  type Address {
    line_one: String
    line_two: String
    city: String
    zipcode: String
  }

  type Pet {
    _id: ID
    name: String
    species: String
    age: Int
    sex: String
    image: String
    breed: String
    temperament: String
    childFriendly: Boolean
    description: String
    dateCreated: String
    active: Boolean
    medicalHistory: medicalHistory
  }

  type medicalHistory {
    allergies: [String]
    vaccinated: Boolean
    spayedNeutered: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input userForm {
    _id: ID
    username: String
    email: String
    password: String!
    address: UserAddress
  }
  input UserAddress {
    line_one: String
    line_two: String
    city: String
    zipcode: String
  }
  input petData {
    name: String
    species: String
    age: Int
    sex: String
    image: String
    breed: String
    temperament: String
    childFriendly: Boolean
    description: String
    active: Boolean
    medicalHistory: PetsMedicalHistory
  }
  input PetsMedicalHistory {
    allergies: [String]
    vaccinated: Boolean
    spayedNeutered: Boolean
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
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userInput: userForm): Auth
    addPet(pet: petData): Pet
    updateUser(user: userForm): User
    updatePet(pet: petData): Pet
    deletePet(petId: ID!): Pet
  }
`;
module.exports = typeDefs;

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($userInput: userForm) {
    addUser(userInput: $userInput) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation for adding a new pet
export const ADD_PET = gql`
  mutation addPet($pet: petData) {
    addPet(pet: $pet) {
      _id
      name
      species
      age
      sex
      image
      breed
      temperament
      childFriendly
      description
      dateCreated
      active
      medicalHistory {
        allergies
        vaccinated
        spayedNeutered
      }
      owner {
        username
        email
        address {
          city
          state
        }
      }
    }
  }
`;

// Mutation for updating a user
export const UPDATE_USER = gql`
  mutation updateUser($userForm: userForm, $password: String) {
    updateUser(userForm: $userForm, password: $password) {
      _id
      username
      email
      address {
        line_one
        line_two
        city
        state
        zipcode
      }
    }
  }
`;

// Mutation for updating a pet
export const UPDATE_PET = gql`
  mutation updatePet($petData: petData) {
    updatePet(petData: $petData) {
      _id
      name
      species
      age
      sex
      image
      breed
      temperament
      childFriendly
      description
      dateCreated
      active
      medicalHistory {
        allergies
        vaccinated
        spayedNeutered
      }
      petCount
    }
  }
`;

// Mutation for deleting a pet
export const REMOVE_PET = gql`
  mutation removePet($petId: ID) {
    deletePet(petId: $petId) {
      _id
      username
      email
      address {
        line_one
        line_two
        city
        state
        zipcode
      }
      petsForAdoption {
        _id
        name
        species
        age
        sex
        image
        breed
        temperament
        childFriendly
        description
        dateCreated
        active
        medicalHistory {
          allergies
          vaccinated
          spayedNeutered
        }
      }
      petCount
    }
  }
`;

// Mutation for following a Pet
export const FOLLOW_PET = gql`
  mutation followPet($petId: ID!) {
    followPet(petId: $petId){
      _id
      username
      email
    }
  }
`;

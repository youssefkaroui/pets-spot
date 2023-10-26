import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
      }
    }
  }
`;

// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!, $address: UserAddress) {
//     addUser(userInput: {
//       username: $username,
//       email: $email,
//       password: $password,
//       address: $address
//     }) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

// Mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($userInput: userForm) {
    addUser(userInput: $userInput) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// export const ADD_PET = gql`
//   mutation addPet($petData: petData!) {
//     addPet(petData: $petData) {
//       _id
//       name
//       species
//       age
//       sex
//       image
//       breed
//       temperament
//       childFriendly
//       description
//       dateCreated
//       active
//       medicalHistory {
//         allergies
//         vaccinated
//         spayedNeutered
//       }
//     }
//   }
// `;

// Mutation for adding a new pet
export const ADD_PET = gql`
  mutation addPet($petData: petData) {
    addPet(petData: $petData) {
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
    }
  }
`;


//followPet




// export const UPDATE_USER = gql`
//   mutation updateUser($userForm: userForm!, $password: String!) {
//     updateUser(userForm: $userForm, password: $password) {
//       _id
//       username
//       email
//       address {
//         line_one
//         line_two
//         city
//         zipcode
//       }
//     }
// }
// `;

// export const UPDATE_PET = gql`
//   mutation updatePet($petData: petData!) {
//     updatePet(petData: $petData) {
//       _id
//       name
//       species
//       age
//       sex
//       image
//       breed
//       temperament
//       childFriendly
//       description
//       dateCreated
//       active
//       medicalHistory {
//         allergies
//         vaccinated
//         spayedNeutered
//       }
//     }
//   }
// `;

// export const REMOVE_PET = gql`
//   mutation removePet($petId: ID!) {
//     deletePet(petId: $petId) {
//       _id
//       name
//       species
//       # Include other fields you want to retrieve
//     }
//   }
// `;



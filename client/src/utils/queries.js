import { gql } from "@apollo/client";

// Query to fetch user data after login
export const GET_USER_DATA = gql`
  query me {
    me {
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
      }
      petsFollowed {
        _id
        name
        species
        image
      }
      petCount
      followingCount
    }
  }
`;

// Query to search for pets
export const SEARCH_PETS = gql`
  query search($searchInput: searchForm) {
    search(searchInput: $searchInput) {
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
        address {
          city
          state
        }
      }
    }
  }
`;

// Query to fetch a pet's profile
export const GET_PET_PROFILE = gql`
  query petProfile($petId: ID!) {
    petProfile(petId: $petId) {
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

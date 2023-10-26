import { gql } from '@apollo/client';

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
      petsFollowed: {
        _id: ID
        name: String
        species: String
        image: String
      }
    }
  }
`;


//Search

//petProfile
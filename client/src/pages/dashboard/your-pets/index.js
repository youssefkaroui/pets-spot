import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PET } from "../../../utils/mutations";
//IDK IF I NEED QUERY_ME
// import { QUERY_MY_PETS, QUERY_ME } from "../../../utils/queries";
//UNCOMMENT THIS OUT UNTIL BACKEND IS WORKING
// import Auth from "../../../utils/auth";

const PetList = ({ petsForAdoption }) => {
  // const { loading, data } = userQuery(QUERY_MY_PETS);
  console.log(petsForAdoption[0])
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // const [addPet, { error }] = useMutation(ADD_PET, {
  //   update(cache, { data: { addPet } }) {
  //     try {
  //       const { pets } = cache.readQuery({ query: QUERY_MY_PETS });

  //       cache.writeQuery({
  //         query: QUERY_MY_PETS,
  //         data: { pets: [addPet, ...pets] },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }

  // update me object's cache with new pet
  // const { me } = cache.readQuery({ query: QUERY_ME });
  // cache.writeQuery({
  //   query: QUERY_ME,
  //   data: { me: { ...me, pets: [...me.pets, addPet] } },
  // });
  //   },
  // });

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await addPet({
  //       variables: {
  //         thoughtText,
  //         thoughtAuthor: Auth.getProfile().data.username,
  //       },
  //     });

  //     setThoughtText("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name === "thoughtText" && value.length <= 280) {
  //     setThoughtText(value);
  //     setCharacterCount(value.length);
  //   }
  // };

  //UNCOMMENT THIS WHEN THE BACKEND WORKS MORE
  // const pets = data.pets;
  const tempPetData = [
    { _id: 1, name: "test", description: "this is the first pet", info: "123" },
    {
      _id: 2,
      name: "test2",
      description: "this is the second pet",
      info: "456",
    },
  ];
  const pets = tempPetData;

  return (
    <div>
      <h3>Your Pet Adoption Listings</h3>
      {/* YOU NEED TO SWAP THE NEXT TWO LINES WHEN BACKEND IS DONE */}
      {/* {Auth.loggedIn() ? ( */}
      {/* {pets ? (
        <>
          {pets.length === 0 ? (
            <p>You have no pets listed for adoption.</p>
          ) : (
            <ul>
              {pets.map((pet) => (
                <li key={pet[0]._id}>
                  <h4>{pet[0].name}</h4>
                  <p>{pet[0].description}</p>
                  <p>{pet[0].info}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>
          You need to be logged in to see your pet listing. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )} */}
    </div>
  );
};

export default PetList;

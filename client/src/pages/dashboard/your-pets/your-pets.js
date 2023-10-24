import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PET } from "../../../utils/mutations";
//IDK IF I NEED QUERY_ME
import { QUERY_MY_PETS, QUERY_ME } from "../../../utils/queries";

import Auth from "../../../utils/auth";

const PetList = () => {
  const { loading, data } = userQuery(QUERY_MY_PETS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const [addPet, { error }] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      try {
        const { pets } = cache.readQuery({ query: QUERY_MY_PETS });

        cache.writeQuery({
          query: QUERY_MY_PETS,
          data: { pets: [addPet, ...pets] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache with new pet
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, pets: [...me.pets, addPet] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPet({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "thoughtText" && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  const pets = data.pets;

  return (
    <div>
      <h3>Your Pet Adoption Listings</h3>

      {Auth.loggedIn() ? (
        <>
          {pets.length === 0 ? (
            <p>You have no pets listed for adoption.</p>
          ) : (
            <ul>
              {pets.map((pet) => (
                <li key={pet._id}>
                  <h4>{pet.name}</h4>
                  <p>{pet.description}</p>
                  <p>{pet.info}</p>
                </li>
              ))}
            </ul>
          )}
          {/* <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Pet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form> */}
        </>
      ) : (
        <p>
          You need to be logged in to see your pet listing. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PetList;

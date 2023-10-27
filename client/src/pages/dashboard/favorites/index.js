import React from "react";
import { Link } from "react-router-dom";
//THIS IS BORROWED FROM MERN 21 ACTIVITY 26

const tempPetData = [
  { _id: 1, name: "test" },
  { _id: 2, name: "test2" },
];
const pets = tempPetData;

const SavedPetList = ({ petsFollowed }) => {
  if (!petsFollowed.length) {
    return <h3>No Saved Pets Yet!</h3>;
  }

  return (
    <div>
      {petsFollowed.map((pet) => (
        <div key={pet._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            <Link className="text-light" to={`/profiles/${pet._id}`}>
              {pet.name}
              <div className="card-body bg-light p-2">
                <p>{pet.description}</p>
              </div>
            </Link>
          </h4>
        </div>
      ))}
    </div>
  );
};

export default SavedPetList;

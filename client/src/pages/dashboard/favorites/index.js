import React from "react";
import { Link } from "react-router-dom";
//THIS IS BORROWED FROM MERN 21 ACTIVITY 26

const SavedPetList = ({
  savedPets,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!pets.length) {
    return <h3>No Saved Pets Yet!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {pets &&
        savedPets.map((pet) => (
          <div key={pet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link className="text-light" to={`/profiles/${pet.postedBy}`}>
                  {pet.name}
                  {/* i know i have two of these here not sure where to put it */}
                  <span style={{ fontSize: "1rem" }}>
                    {/* PET SAVED ON DATA REQUIRED */}
                    Favorited on {pet.savedOn}
                  </span>
                </Link>
              ) : (
                <>
                  {/* i know i have two of these here not sure where to put it */}
                  <span style={{ fontSize: "1rem" }}>
                    Favorited on {pet.savedOn}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{pet.petInfo}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SavedPetList;

import React from "react";
import YourPets from "../your-pets";
import Favorites from "../favorites";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from "@chakra-ui/react";
// import { Navigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";

// import { QUERY_USER } from "../utils/queries";

// import Auth from "../utils/auth";

const Profile = () => {
  // const { username: userParam } = useParams();
  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });
  // const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (!user?.username) {
  return (
    <div className="mainContainer">
      {/* <div>
        <Tabs variant="unstyled">
          <TabList>
            <Tab>
              <Link className="dash-link" href="#Profile" onClick={() => handlePageChange("Profile")}>
                Profile
              </Link>
            </Tab>

            <Tab>
              <Link href="YourPets" className="dash-link">
                Listed Pets
              </Link>
            </Tab>

            <Tab>
              <Link href="YourPets" className="dash-link">
                Saved Pets
              </Link>
            </Tab>
          </TabList>
        </Tabs>
      </div> */}
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    </div>
  );
  // return (
  //   <h4>
  //     You need to be logged in to see this. Use the navigation links above to
  //     sign up or log in!
  //   </h4>
  // );
  // }
  // return (
  //   <div>
  //     <div className="flex-row justify-center mb-3">
  //       <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
  //         Viewing {userParam ? `${user.username}'s` : "your"} profile.
  //       </h2>
  //       {/* {!userParam && (
  //         <div
  //           className="col-12 col-md-10 mb-3 p-3"
  //           style={{ border: '1px dotted #1a1a1a' }}
  //         >
  //           <ThoughtForm />
  //         </div>
  //       )} */}
  //     </div>
  //   </div>
  // );
};

export default Profile;

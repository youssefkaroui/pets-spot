import React, { useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import NavTabs from "../components/Navbar";
import YourPets from "../pages/dashboard/your-pets";
import Favorites from "../pages/dashboard/favorites";
import Profile from "../pages/dashboard/profile";
import Footer from "../components/Footer";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA } from "../utils/queries";
import sampleData from "./sampleData.json"; //NEEDS TO BE COMMENTED OUT LATER

export default function DashboardContainer() {
  const [currentPage, setCurrentPage] = useState("Profile");
  // create a useQuery for ME? then pass it down to YourPets/Favorites/Profile
  const { loading, data } = useQuery(GET_USER_DATA);
  const userData = data?.me || sampleData.me;
  const { username, email, address, petsForAdoption, petsFollowed } = userData;
  // console.log(`petsForAdoption: ${petsForAdoption}`);
  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "YourPets") {
      return <YourPets petsForAdoption={petsForAdoption} />;
    }
    if (currentPage === "Favorites") {
      return <Favorites petsFollowed={petsFollowed} />;
    }
    return (
      <Profile
        name={username}
        email={email}
        address={address}
        petsForAdoption={petsForAdoption}
      />
    );
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="DashContainer">
      <div className="tabs-container">
        <Tabs variant="unstyled">
          <TabList>
            <Tab
              className="dash-link"
              fontSize="25px"
              onClick={() => handlePageChange("Profile")}
            >
              Profile
            </Tab>

            <Tab
              className="dash-link"
              fontSize="25px"
              onClick={() => handlePageChange("YourPets")}
            >
              Listed Pets
            </Tab>

            <Tab
              className="dash-link"
              fontSize="25px"
              onClick={() => handlePageChange("Favorites")}
            >
              Favorite Pets
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div className="page-content">{renderPage()}</div>
    </div>
  );
}

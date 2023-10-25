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

export default function DashboardContainer() {
  const [currentPage, setCurrentPage] = useState("Profile");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "YourPets") {
      return <YourPets />;
    }
    if (currentPage === "Favorites") {
      return <Favorites />;
    }
    return <Profile />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="mainContainer">
      <div>
        <Tabs variant="unstyled">
          <TabList>
            <Tab
              className="dash-link"
              currentPage="Profile"
              onClick={() => handlePageChange("Profile")}
            >
              Profile
            </Tab>

            <Tab
              className="dash-link"
              currentPage="YourPets"
              onClick={() => handlePageChange("YourPets")}
            >
              Listed Pets
            </Tab>

            <Tab
              className="dash-link"
              currentPage="Favorites"
              onClick={() => handlePageChange("Favorites")}
            >
              Favorite Pets
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div>{renderPage()}</div>
    </div>
  );
}

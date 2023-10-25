import React, { useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import NavTabs from "../components/Navbar";
import YourPets from "../pages/dashboard/your-pets";
import Favorites from "../pages/dashboard/favorites";
import Profile from "../pages/dashboard/profile";
import Footer from "./Footer";

export default function PortfolioContainer() {
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
        <Box>Test SEE IF THIS WORKS</Box>
        <NavTabs
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />

        {renderPage()}
      </div>

      <Footer></Footer>
    </div>
  );
}

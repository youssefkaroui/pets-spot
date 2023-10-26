import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
// import Dashboard from "./pages/Dashboard";
//import Donate from './pages/Donate';     NICE TO HAVE
import Home from "./pages/Home";
// import Listings from './pages/Listings';
import Favorites from "./pages/dashboard/favorites";
import Profile from "./pages/dashboard/profile";
import YourPets from "./pages/dashboard/your-pets";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route 
              path='/listings' 
              element={<Listings />} 
            />
            <Route 
              path='/dashboard' 
              element={<Dashboard />} 
            /> */}
              {/* <Route 
              path='/donate' 
              element={<Donate />} 
            /> */}
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/yourpets" element={<YourPets />} />
              <Route
                path="*"
                element={<h1 className="display-2">Wrong page!</h1>}
              />
            </Routes>
            <Footer />
          </>
        </Router>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;

// {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//             {/* <Route
//               path='/donate'
//               element={<Donate />}
//             /> */}
//             {/* <Route path="/favorites" element={<Favorites />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/yourpets" element={<YourPets />} /> */}

// Nice to Have, here in case we get to it

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLazyQuery } from "@apollo/client";
import { MAKE_DONATION } from "../utils/queries";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  RadioGroup,
  Radio,
  Input,
  VStack,
  Center,
  Text
} from "@chakra-ui/react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Donation() {
  const [clientSecret, setClientSecret] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState();
  const [makePaymentIntent, { data }] = useLazyQuery(MAKE_DONATION);
  useEffect(() => {
    //creates paymentIntent on page load
    try {
      makePaymentIntent({
        variables: {
          donation: 1000,
        },
      });
      setClientSecret(data.donate.clientSecret);
    } catch {
      console.log("useEffect Failed");
    }
  }, []);
  //theme for stripe
  const appearance = {
    theme: "stripe",
  };
  //pass appearance and client secret to options object
  const options = {
    clientSecret,
    appearance,
  };
  //function to create paymentIntent based on donationAmount state
  const handleSubmit = async (e) => {
    makePaymentIntent({
      variables: {
        donation: donationAmount,
      },
    });
    //update client secret
    setClientSecret(data.donate.clientSecret);

    setShowForm((prev) => !prev);
  };
  //set donationAmount state based on typed input
  const handleChange = (e) => {
    //converts input string to float with 2 significant figures eg 2.50
    setDonationAmount(parseFloat(e.target.value).toFixed(2));
  };

  return (
    <>
      {/* If user has submitted donation, renders payment form  */}
      {showForm ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            donationAmount={donationAmount}
            handleChange={handleChange}
          ></CheckoutForm>
        </Elements>
      ) : (
        <VStack
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          justifyContent="center"
          px={5}
          py={3}
          m={2}
        >
          <Center>
            {/* Radios with preset payment amounts */}
            {/* <h1>${isNaN(donationAmount) ? parseFloat(0.0) : donationAmount}</h1> */}
            <FormControl>
              <FormLabel>How Much Would You Like To Donate?</FormLabel>
              <RadioGroup
                onChange={(value) => {
                  setDonationAmount(Number(value));
                }}
              >
                <HStack>
                  <Radio value="1">$1.00</Radio>
                  <Radio value="5">$5.00</Radio>
                  <Radio value="10">$10.00</Radio>
                  <Radio value="100">$100.00</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </Center>
          <Center>
            {/* custom payment amount */}
            <FormControl onChange={handleChange}>
              <FormLabel>Or input a custom amount ($)</FormLabel>
              <Input type="number" placeholder="1.00"></Input>
            </FormControl>
          </Center>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!donationAmount || donationAmount <= 0.1}
            bg={!donationAmount || donationAmount <= 0.1 ? "grey" : "#5469d4"}
          >
            Proceed to Checkout
          </Button>
        </VStack>
      )}
    </>
  );
}

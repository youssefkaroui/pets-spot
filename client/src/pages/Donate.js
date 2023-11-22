// Nice to Have, here in case we get to it

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLazyQuery } from "@apollo/client";
import { MAKE_DONATION } from "../utils/queries";
import { Button, FormControl, FormLabel, HStack, RadioGroup, Radio } from "@chakra-ui/react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function Donation() {
  const [clientSecret, setClientSecret] = useState("");
  const [showForm, setShowForm] = useState(false)
  const [donationAmount, setDonationAmount] = useState()
  const [makePaymentIntent, {data}] = useLazyQuery(MAKE_DONATION)
  useEffect(() => {
    try {makePaymentIntent({
      variables: {
        donation: 1000
      }
    })
    setClientSecret(data.donate.clientSecret)
    }
    catch {
      console.log("useEffect Failed")
    }
    // fetch("/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const handleClick = async (e) => {
    
    makePaymentIntent({
      variables: {
        donation: donationAmount
      }
    })
    setClientSecret(data.donate.clientSecret)
    console.log("Now data is:")
    console.log(data)
    setShowForm((prev)=> !prev)
  }
  return (
    <>
    <FormControl>
      <FormLabel>
        How Much Would You Like To Donate?
      </FormLabel>
      <RadioGroup onChange={(value) => {
        setDonationAmount(Number(value))
      }}>
        <HStack>
          <Radio value="1">$1.00</Radio>
          <Radio value="5">$5.00</Radio>
          <Radio value="10">$10.00</Radio>
          <Radio value="100">$100.00</Radio>
        </HStack>
      </RadioGroup>
    </FormControl>
    <Button type="submit" onClick={handleClick}>Proceed to Checkout</Button>

    {showForm ? (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    ) : null}
    </>
  )
}

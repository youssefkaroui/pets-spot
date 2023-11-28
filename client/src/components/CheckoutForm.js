import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  HStack,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import "./CheckoutForm.css";
export default function CheckoutForm({ donationAmount, handleChange }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, toggleShowInput] = useState(false);
  useEffect(() => {
    //Boilerplate code
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        //if payment successful, redirects to success page
        return_url: "http://localhost:3000/donate/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <HStack>
          <h1>${isNaN(donationAmount) ? parseFloat(0.0) : donationAmount}</h1>
          {/* allow user to edit amount without navigation away */}
          <IconButton
            icon={<CiEdit />}
            color="white"
            bg="primary.main"
            onClick={() => toggleShowInput((prev) => !prev)}
          ></IconButton>
        </HStack>
        {showInput ? (
          <Center>
            <FormControl
              onChange={handleChange}
              cursor="pointer"
              justifyContent="center"
              px={5}
              py={3}
              m={2}
            >
              <FormLabel>Edit donation amount ($)</FormLabel>
              <Input type="number" placeholder="1.00"></Input>
            </FormControl>
          </Center>
        ) : null}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}

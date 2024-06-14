"use client";
import React from "react";
import GooglePay from "./Components/GooglePay";
import axios from "axios";

const Page = () => {
  const handlePaymentAuthorized = async (
    paymentData: google.payments.api.PaymentData
  ) => {
    try {
      const response = await axios.post("/api/payment", paymentData);
      console.log("Payment processed successfully:", response.data);
    } catch (error) {
      console.error("Payment processing error:", error);
    }
  };

  const handlePaymentDataChanged = (
    paymentData: google.payments.api.PaymentData
  ) => {
    // Handle any changes in the payment data, if necessary
    console.log("Payment Data Changed:", paymentData);
  };
  return (
    <GooglePay
      onPaymentAuthorized={handlePaymentAuthorized}
      onPaymentDataChanged={handlePaymentDataChanged}
    />
  );
};

export default Page;

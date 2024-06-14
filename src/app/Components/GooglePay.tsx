"use client";
import React from "react";
import GooglePayButton from "@google-pay/button-react";

const GooglePay: React.FC<{
  onPaymentAuthorized: (paymentData: google.payments.api.PaymentData) => void;
  onPaymentDataChanged?: (paymentData: google.payments.api.PaymentData) => void;
}> = ({ onPaymentAuthorized, onPaymentDataChanged }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <GooglePayButton
        environment="TEST"
        buttonColor="black"
        buttonType="subscribe"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA", "AMEX", "DISCOVER"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
            // {
            //   type: "PAYPAL",
            //   parameters: {
            //     allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            //     allowedCardNetworks: ["MASTERCARD", "VISA"],
            //   },
            //   tokenizationSpecification: {
            //     type: "PAYMENT_GATEWAY",
            //     parameters: {
            //       gateway: "stripe",
            //       gatewayMerchantId: "exampleGatewayMerchantId",
            //     },
            //   },
            // },
          ],
          merchantInfo: {
            merchantId: "BCR2DN4TWWQNXDQP",
            merchantName: "abc shop",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "10.00",
            currencyCode: "USD",
            countryCode: "US",
          },
        }}
        onLoadPaymentData={(paymentData) => {
          console.log("Success", paymentData.paymentMethodData);
          onPaymentAuthorized(paymentData);
        }}
        // onPaymentAuthorized={(paymentData) => {
        //   console.log("Payment Authorized Success", paymentData);
        //   return { transactionState: "SUCCESS" };
        // }}
        // onPaymentDataChanged={(paymentData) => {
        //   console.log("On Payment Data Changed", paymentData);
        //   return {};
        // }}
      />
    </div>
  );
};

export default GooglePay;

"use client";
import React, { useEffect, useState } from "react";

const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedCardNetworks: ["VISA", "MASTERCARD"],
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
  },
};

const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod],
};

const GPay = () => {
  const [gPayBtn, setGPayBtn] = useState(null);
  let googlePayClient: any = null;

  function getGooglePaymentsClient() {
    if (googlePayClient === null) {
      googlePayClient = new google.payments.api.PaymentsClient({
        environment: "TEST",
      });
    }
    return googlePayClient;
  }

  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "default",

        buttonType: "long",

        onClick: processPayment,
      });

      setGPayBtn(googlePayButton);
    }
  }

  const processPayment = () => {
    console.log("test");

    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "example",
        gatewayMerchantId: "exampleGatewayMerchantId",
      },
    };
    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: "FULL",
          phoneNumberRequired: true,
        },
      },
    };

    const transactionInfo = {
      totalPriceStatus: "FINAL",
      totalPrice: "123.45",
      currencyCode: "USD",
    };

    const merchantInfo = {
      // merchantId: '01234567890123456789', Only in PRODUCTION
      merchantName: "Example Merchant Name",
    };

    const paymentDataRequest = {
      ...googlePayBaseConfiguration,
      ...{
        allowedPaymentMethods: [cardPaymentMethod],
        transactionInfo,
        merchantInfo,
      },
    };
    googlePayClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData: any) => {
        console.log(paymentData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const googlePayClient = getGooglePaymentsClient();
    googlePayClient

      .isReadyToPay(googlePayBaseConfiguration)
      .then((response: any) => {
        if (response.result) {
          createAndAddButton();
        } else {
          alert("Unable to pay using Google Pay");
        }
      })
      .catch((err: any) => {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Click the Pay button</h1>
      <div
        onClick={processPayment}
        //   dangerouslySetInnerHTML={{ __html: gPayBtn && gPayBtn.innerHTML }}
      />
    </div>
  );
};

export default GPay;

"use client";

import Script from "next/script";

function PayPalDonate() {
  return (
    <Script
      src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
      strategy="lazyOnload"
      defer={true}
      onLoad={(e) => {
        if (window.PayPal && window.PayPal.Donation) {
          window.PayPal.Donation.Button({
            env: "production",
            hosted_button_id: "S7Y2QBUEZKZWW",
            image: {
              src: "https://www.paypalobjects.com/en_US/IT/i/btn/btn_donateCC_LG.gif",
              alt: "Donate with PayPal button",
              with: 147,
              height: 47,
              title: "PayPal - The safer, easier way to pay online!",
            },
          }).render("#donate-button");
        }
      }}
    />
  );
}

export default PayPalDonate;

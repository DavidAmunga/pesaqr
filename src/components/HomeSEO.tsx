import React from "react";
import { NextSeo } from "next-seo";

const HomeSEO = () => {
  const title = "PesaQR | Generate Payment QR Codes";
  const description = "Generate Payment QR Codes";
  const url = `https://pesaqr.com`;
  const image = `https://pesaqr.com/ogimage.png`;
  const keywords = `till number,qr,qr code`;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: `${image}`,
            width: 1200,
            height: 630,
            alt: "PesaQR",
          },
        ],

        site_name: "PesaQR",
      }}
      additionalMetaTags={[
        {
          name: "keywords",
          content: keywords,
        },
      ]}
      twitter={{
        handle: "@davidamunga_", // Replace with your Twitter handle
        site: "@davidamunga_", // Replace with your Twitter username
        cardType: "summary_large_image",
      }}
    />
  );
};

export default HomeSEO;

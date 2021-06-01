import React from "react";
import Head from "next/head";
import "../styles/styles.css";

// This default export is required in a new `pages/_app.js` file.
export default function CovidScannerApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>John's Covid Scanner</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/covid-test/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/covid-test/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/covid-test/favicon-16x16.png"
        />
        <link rel="manifest" href="/covid-test/manifest.json" />
        <link
          rel="mask-icon"
          href="/covid-test/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

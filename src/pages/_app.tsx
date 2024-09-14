import { AppProvider } from "@/context/AppContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
           <Script
           defer
           data-domain="pesaqr.com"
           src="https://analytics.davidamunga.com/js/script.js"
         />
          )}
    <AppProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </AppProvider>
    </>
   
  );
}

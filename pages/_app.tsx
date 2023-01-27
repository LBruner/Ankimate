import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import Head from "next/head";
import Navbar from "../src/UI/Navbar"; 
import storeIndex from '../src/store/StoreIndex'
import React from "react";
function MyApp({ Component, pageProps }: AppProps) {
  return <>    
    <Head>
      <title>Ankiauto</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="description" content="Anki automated cards"/>
      <meta name={"viewport"} content={"initial-scale=1.0, width=device-width"} />
    </Head>
    <Provider store={storeIndex}>
    <Navbar/>
    <Component {...pageProps} />
  </Provider>
  </>
}

export default MyApp

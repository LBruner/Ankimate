import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import storeIndex from "../src/components/store/StoreIndex";
import Navbar from "../src/components/UI/Navbar";
import Head from "next/head"; 

function MyApp({ Component, pageProps }: AppProps) {
  return <>    
    <Head>
      <title>Ankimate</title>
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

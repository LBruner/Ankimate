import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import storeIndex from "../src/components/store/StoreIndex";
import Navbar from "../src/components/UI/Navbar"; 

function MyApp({ Component, pageProps }: AppProps) {
  return <>    
    <Provider store={storeIndex}>
    <Navbar/>
    <Component {...pageProps} />
  </Provider>
  </>
}

export default MyApp

import '../styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

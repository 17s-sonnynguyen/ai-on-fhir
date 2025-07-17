// pages/_app.js

import '../styles/globals.css'
import '../i18n' // Load the i18n configuration

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

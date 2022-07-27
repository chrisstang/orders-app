import OrderProvider from '../context/orderContext';
import SEO from '../components/SEO';
import Header from '../components/Header';
import 'bootstrap/scss/bootstrap.scss'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <OrderProvider>
      <SEO />
      <Header />
      <Component {...pageProps} />
    </OrderProvider>
  )
}

export default MyApp

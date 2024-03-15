import "@/styles/globals.css";
import PropTypes from 'prop-types';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};

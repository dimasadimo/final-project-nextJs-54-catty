import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import UserContextProvider from "@/context/userContext";

export default function App({ Component, pageProps, router }) {
  const { pathname } = router;

  const excludeContextPages = ['/register', '/login'];
  const shouldProvideUserContext = !excludeContextPages.includes(pathname);

  return (
    <ChakraProvider>
      { shouldProvideUserContext ? (
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
        ) : <Component {...pageProps} />
      }
    </ChakraProvider>
  );
};

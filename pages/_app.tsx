import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";
import "../styles/globals.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Best available products on the market</title>
        <meta name="description" content="very meaningful description" />
        <meta property="og:title" content="very meaningful title" />
        <meta property="og:description" content="very meaningful description" />
        <meta property="og:url" content="https:url" />
        <meta property="og:type" content="https://website.com/" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

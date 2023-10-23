import "../styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import Layout from "components/Layout";
import { getPageTitle } from "utils/meta";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { hideGnb, session } = pageProps;

  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-5SWZZ9VY1H" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || []
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date())

          gtag('config', 'G-5SWZZ9VY1H')
        `}
          </Script>
        </>
      )}
      <Head>
        <title>{getPageTitle()}</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout hideGnb={hideGnb}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

import "../styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "components/Layout";

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
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout hideGnb={hideGnb}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

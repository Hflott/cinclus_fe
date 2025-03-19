import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import { store } from "../redux/store";
import "../styles/globals.css";
import theme from "../theme";
import Layout from "../components/Layout/Layout";
import * as gtag from "../analytics";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: 30000, // 30 seconds
          },
        },
      })
  );

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      let pageUrl: URL;
      try {
        pageUrl = new URL(url, window.location.origin); // Parse string to URL
      } catch {
        pageUrl = new URL(window.location.href); // Fallback to current URL
      }
      gtag.pageview(pageUrl);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;

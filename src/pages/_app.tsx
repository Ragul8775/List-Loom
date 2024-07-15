import { ThemeContextProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <Component {...pageProps} />;
      </ThemeContextProvider>
    </SessionProvider>
  );
}

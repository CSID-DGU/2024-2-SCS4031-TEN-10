import { FestivalProvider } from "@/contexts/FestivalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FestivalProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </FestivalProvider>
    </>
  );
}

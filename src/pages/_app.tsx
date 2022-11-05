import { LayoutAuth } from "@/components/Layout";
import { StoreContext } from "@/core";
import type { AppProps } from "next/app";
import { Lato } from "@next/font/google";

import "normalize.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Lato({
  weight: "400",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />

      <StoreContext>
        <LayoutAuth>
          <Component {...pageProps} />
        </LayoutAuth>
      </StoreContext>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
    </>
  );
}

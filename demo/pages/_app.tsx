import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";

import { DialogProvider } from "../utils/DialogContext";
import TutorialDialog from "../components/Dialog";

import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: dark,
      }}
      {...pageProps}
    >
      <DialogProvider>
        <TutorialDialog />
        <Component {...pageProps} />
      </DialogProvider>
    </ClerkProvider>
  );
}
export default MyApp;

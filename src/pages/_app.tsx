import { MarkGameProvider } from "@/providers/MarkGameProvider";
import { ReversiGameProvider } from "@/providers/ReversiGameProvider";
import "./globals.css";
import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <MarkGameProvider>
//       <Component {...pageProps} />
//   </MarkGameProvider>;
// }

export default function App({ Component, pageProps }: AppProps) {
  return <ReversiGameProvider><MarkGameProvider>
      <Component {...pageProps} />
      </MarkGameProvider>
  </ReversiGameProvider>;
}

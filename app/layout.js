import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/clientComp/Navbar";
import Footer from "@/components/clientComp/Footer";
import GoToTop from "@/components/clientComp/GoToTop";
import LoadingPage from "@/components/clientComp/LoadingPage";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Free Online Games on PopyGames | Play Now",
  description:
    "Play free online games at PopyGames, the best place to play high-quality browser games. We add new games. Have fun!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body
        className={`${inter.className} ${nunito.variable} bg-smokeBlack overflow-y-scroll`}
      >
        <Navbar />
        {children}

        <GoToTop />

        <Footer />

        <LoadingPage />

        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}

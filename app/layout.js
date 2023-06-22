import Navbar from "../components/Navbar";
import "./../styles/globals.css";
import { Providers } from "@components/Providers";
import { FilterContextProvider } from "@components/FilterContext";

export const metadata = {
  title: "telegram.ads",
  description: "telegram.ads",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ru">
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body>
        <Providers>
          <FilterContextProvider>
          <main>
            <Navbar />
            {children}
            </main>
            </FilterContextProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

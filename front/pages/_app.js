import "styles/globals.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_URL;

import { SessionProvider, useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";

import Header from "comps/layout/header/header";
import Footer from "comps/layout/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { enableMapSet } from "immer";

// Call this before using Redux Toolkit or Immer
enableMapSet();

import { Provider } from "react-redux";
import { store } from "store/store";
import { useDispatch } from "react-redux";

import { getProductsInfo } from "store/productsSlice";
import { getCategoriesInfo } from "store/categoriesSlice";

import { Balsamiq_Sans } from "next/font/google";
import { Caveat } from "next/font/google";
import { Overpass } from "next/font/google";
import { Pacifico } from "next/font/google";
import { Space_Mono } from "next/font/google";

const balsamiqSans = Balsamiq_Sans({ weight: "400", subsets: ["latin"] });
const caveat = Caveat({ weight: "400", subsets: ["latin"] });
const overpass = Overpass({ weight: "900", subsets: ["latin"] });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
const spaceMono = Space_Mono({ weight: "400", subsets: ["latin"] });
export { balsamiqSans, caveat, overpass, pacifico, spaceMono };

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const excludedPaths = ["/404", "/pay"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap");
      require("@popperjs/core");
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title> Живий світ - Магазин зоотоварів і товарів для дому </title>
        <meta
          name="description"
          content="Живий Світ - Магазин н айкращих товарів для вашого дому, домашніх улюбленців та рослин"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <div className={`min-vh-80 ${balsamiqSans.className}`}>
            {!excludedPaths.includes(router.pathname) && <Header />}
            <FetchData />
            <Component {...pageProps} />
          </div>
          {!excludedPaths.includes(router.pathname) && <Footer />}
        </Provider>
      </SessionProvider>
    </div>
  );
}

//todo unefficient
//todo it loads all the products on the first render or rerender of this component
function FetchData() {
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getProductsInfo());
      dispatch(getCategoriesInfo());
      setFetched(true);
    }
  }, [dispatch, fetched]);

  return null;
}

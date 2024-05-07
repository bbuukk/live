import "styles/globals.scss";
import Head from "next/head";

import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Import the styles manually to prevent a Font Awesome icon server-side rendering bug
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { SessionProvider, getSession } from "next-auth/react";
import { signIn } from "store/userSlice";

import React, { useState, useEffect, Suspense } from "react";

import { lazy } from "react";

const ChangePasswordModal = lazy(() =>
  import("comps/modals/change_password/change_password_modal")
);
const SignInModal = lazy(() =>
  import("comps/modals/auth/sign_in_modal/sign_in_modal")
);
const SignUpModal = lazy(() =>
  import("comps/modals/auth/sign_up_modal/sign_up_modal")
);
const DeleteAccountModal = lazy(() =>
  import("comps/modals/delete_account/delete_account_modal.js")
);
const CartModal = lazy(() => import("comps/modals/cart/cart_modal"));
const WriteReviewModal = lazy(() =>
  import("comps/modals/reviews/write_review_modal")
);

import Header from "comps/layout/header/header";

const Footer = lazy(() => import("comps/layout/footer/footer"));

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { enableMapSet } from "immer";
enableMapSet();

import { Provider } from "react-redux";
import { store } from "store/store";
import { useDispatch, useSelector } from "react-redux";

import { getProductsInfo } from "store/productsSlice";
import { getCategoriesInfo } from "store/categoriesSlice";

import { useCart } from "hooks/useCart";

import { Balsamiq_Sans } from "next/font/google";
import { Pacifico } from "next/font/google";

const balsamiqSans = Balsamiq_Sans({ weight: "400", subsets: ["latin"] });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });
export { balsamiqSans, pacifico };

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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
        <title> Живий світ: Магазин зоотоварів і товарів для дому </title>
        <meta
          name="description"
          content="Живий Світ: Магазин найкращих товарів для вашого дому, домашніх улюбленців та рослин"
        />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Header />
          <Body>
            <Component {...pageProps} />
          </Body>
          <Footer />
        </Provider>
      </SessionProvider>
    </div>
  );
}

const Body = ({ children }) => {
  const { loading } = useSelector((state) => state.modals);

  return (
    <div className={`min-vh-65 ${balsamiqSans.className}`}>
      <div className={`loading_overlay ${loading ? "show" : ""} `} />

      <FetchData />
      <Modals />
      {children}
    </div>
  );
};

//todo it loads all the products on the first render or rerender of this component
function FetchData() {
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);

  const { getCart } = useCart();

  useEffect(() => {
    if (!fetched) {
      dispatch(getProductsInfo());
      dispatch(getCategoriesInfo());

      async function getUserCart() {
        const session = await getSession();

        const user = await getCart(session);
        dispatch(signIn(user));
      }
      getUserCart();
      setFetched(true);
    }
  }, [dispatch, fetched]);

  return null;
}

function Modals() {
  return (
    <>
      <Suspense fallback={<></>}>
        <DeleteAccountModal />
        <ChangePasswordModal />
        <SignInModal />
        <SignUpModal />
        <CartModal />
        <WriteReviewModal />
      </Suspense>
    </>
  );
}

import Order from "features/profile/comps/orders_list/order";
import Head from "next/head";
import { getSession } from "next-auth/react";

//todo protect personal pages with server side auth session check
//todo axios get my orders on client side
const OrdersList = () => {
  return (
    <>
      <Head>
        <title> Живий світ | Мої замовлення </title>
        <meta name="description" content="Живий Світ | Мої замовлення" />
      </Head>

      <h1>UNDER DEVELOPMENT</h1>
    </>
  );
};

export default OrdersList;

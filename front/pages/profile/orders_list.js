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

      <TabLayout>
        <h1>UNDER DEVELOPMENT</h1>
      </TabLayout>
    </>
  );
};

export default OrdersList;

//todo delete
// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: `api/auth/signin?callbackUrl=${process.env.BASE_URL}/`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

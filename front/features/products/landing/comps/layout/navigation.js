import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navigation.module.scss";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

const Navigation = ({ activeTab }) => {
  const router = useRouter();
  const { productSlug, productId } = router.query;

  const productUrl = (activeTab) =>
    `/product/${productSlug}/${productId}/${activeTab}`;

  const TabLink = ({ tabName, label }) => {
    const handleClick = (e) => {
      e.preventDefault();
      router.push(productUrl(tabName), undefined, { shallow: true });
    };

    return (
      <Link
        href={productUrl(tabName)}
        className={`nav-link ${s.link}  ${
          activeTab === tabName ? s.active : ""
        }`}
        aria-current="page"
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <ul className={`nav nav-underline mt-4 ${s.navigation}`}>
        <div className={`${s.decor_line}`} />
        <li className={`nav-item ms-5 ${s.link_container}`}>
          <TabLink tabName={"about"} label={"Усе про товар"} />
        </li>
        <li className={`nav-item ${s.link_container}`}>
          <TabLink tabName={"characteristics"} label={"Характеристики"} />
        </li>
        {/* <li>
          <TabLink tabName={"reviews"} label={"Відгуки"} />
        </li> */}
      </ul>
    </>
  );
};

export default Navigation;

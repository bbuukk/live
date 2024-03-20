import s from "./buy_info.module.scss";
import lcs from "../listing_card.module.scss";

const BuyInfo = ({ product }) => {
  return (
    <section className={`${s.buy_info} ${lcs.buy_info}`}>
      <p className={`${s.price}`}>
        {product.price} <span>₴</span>
      </p>

      <button className={`${s.add_to_cart_button}`}>
        <i className="bi bi-cart4" />
      </button>
    </section>
  );
};

export default BuyInfo;

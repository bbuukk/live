import s from "./like_btn.module.scss";
import lcs from "../listing_card.module.scss";

const LikeButton = ({ isLiked }) => {
  return (
    <button
      className={`${s.like_button} btn`}
      //   onMouseDown={() => like(product._id)}
      onMouseDown={() => {}}
    >
      {!isLiked && <i className="bi bi-heart" />}
      {isLiked && <i className={`bi bi-heart-fill ${s.liked}`} />}
    </button>
  );
};

export default LikeButton;

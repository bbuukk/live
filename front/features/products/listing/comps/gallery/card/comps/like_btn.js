import s from "./like_btn.module.scss";
import lcs from "../listing_card.module.scss";

const LikeButton = ({ isLiked }) => {
  return (
    <button
      className={`${s.like_button}`}
      //   onMouseDown={() => like(product._id)}
    >
      {isLiked ? (
        <i className={`bi bi-heart-fill ${s.liked}`} />
      ) : (
        <i className="bi bi-heart" />
      )}
    </button>
  );
};

export default LikeButton;

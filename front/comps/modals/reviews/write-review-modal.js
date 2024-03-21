import { useState } from "react";
import { Modal } from "react-bootstrap";
import s from "./write-review-modal.module.scss";

import StarRating from "comps/star-rating";

const WriteReviewModal = ({ isOpen, toggle }) => {
  const [comment, setComment] = useState("");
  const [cons, setCons] = useState("");
  const [pros, setPros] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // toggle();
  };
  return (
    <>
      <Modal show={isOpen} onHide={toggle} centered size="xl">
        <Modal.Body>
          <p>Write a review</p>
          <hr />
          <form onSubmit={handleSubmit}>
            <StarRating named score={5} fontSize={"4rem"} gap={"3rem"} />
            <div className={`${s.input_fields}`}>
              <div>
                <label htmlFor="pros">Pros</label>
                <input
                  id="pros"
                  className={`form-control fs-5 `}
                  value={pros}
                  onChange={(e) => {
                    setPros(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="cons">Cons</label>
                <input
                  id="cons"
                  className={`form-control fs-5 `}
                  value={pros}
                  onChange={(e) => {
                    setCons(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="comment">Pros</label>
                <input
                  id="comment"
                  className={`form-control fs-5 `}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={`${s.button_area}`}>
              <button onClick={() => toggle()} className="btn">
                <p>Cancel</p>
              </button>
              <button type="submit" className="btn">
                <p>Post my review</p>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WriteReviewModal;

import { useState } from "react";
import "./Modals.css";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

const PostReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const {closeModal} = useModal()
  const [stars, setStars] = useState(0);
  const [reviewStar, setReviewStar] = useState(0)
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("submiting")
    await dispatch(
      createReviewThunk({
        spotId,
        stars,
        review,
      })
    ).then(closeModal,history.goForward())
  };
  return (
    <>
      <div className="create-review-main-div">
        <h1>How was your stay?★</h1>
        <textarea
          placeholder="Leave your review here"
          rows="10"
          cols="40"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="rating-div">
          <div
            onMouseEnter={() => setReviewStar(1)}
            onMouseLeave={() => setReviewStar(0)}
            onClick={() => setStars(1)}
          >
            {reviewStar <= 0 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setReviewStar(2)}
            onMouseLeave={() => setReviewStar(0)}
            onClick={() => setStars(2)}
          >
            {reviewStar <= 1 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setReviewStar(3)}
            onMouseLeave={() => setReviewStar(0)}
            onClick={() => setStars(3)}
          >
            {reviewStar <= 2 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setReviewStar(4)}
            onMouseLeave={() => setReviewStar(0)}
            onClick={() => setStars(4)}
          >
            {reviewStar <= 3 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setReviewStar(5)}
            onMouseLeave={() => setReviewStar(0)}
            onClick={() => setStars(5)}
          >
            {reviewStar <= 4 ? <span>☆</span> : <span>★</span>}
          </div>
          <span className="stars-text">Stars {stars}</span>
        </div>
        <div className="submit-review-div">
          <button onClick={handleSubmit} className="submit-review-button">
            Submit Your Review
          </button>
        </div>
      </div>
    </>
  );
};

export default PostReviewModal;

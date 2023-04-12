import { useState } from "react";
import "./Modals.css";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviews";

const PostReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();

  const [stars, setStars] = useState(4);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiting")
    await dispatch(
      createReviewThunk({
        spotId,
        stars,
        review,
      })
    );
  };
  return (
    <>
      <div className="create-review-main-div">
        <h1>How was your stay?★</h1>
        <h2>{stars}</h2>

        <textarea
          placeholder="Leave your review here"
          rows="10"
          cols="40"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className="rating-div">
          <div
            onMouseEnter={() => setStars(1)}
            onMouseLeave={() => setStars(0)}
          >
            {stars <= 0 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setStars(2)}
            onMouseLeave={() => setStars(0)}
          >
            {stars <= 1 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setStars(3)}
            onMouseLeave={() => setStars(0)}
          >
            {stars <= 2 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setStars(4)}
            onMouseLeave={() => setStars(0)}
          >
            {stars <= 3 ? <span>☆</span> : <span>★</span>}
          </div>
          <div
            onMouseEnter={() => setStars(5)}
            onMouseLeave={() => setStars(0)}
            onClick={() => setStars(5)}
          >
            {stars <= 4 ? <span>☆</span> : <span>★</span>}
          </div>
          <span className="stars-text">Stars</span>
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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./Review.css";
import { Link } from "react-router-dom";
import { deleteReviewThunk } from "../../store/reviews";
import { getCurrentUserReviewsThunk } from "../../store/reviews";

const ReviewIndex = () => {
  const reviewsObj = useSelector((state) => state.reviews);
  const reviews = Object.values(reviewsObj);
  //console.log(reviews)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserReviewsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>Manage Reviews</h1>
      {reviews.map((review) => {
        console.log("CURRENTREVIEW =>", review);
        return (
          <>
            <h4>{review.Spot.name}</h4>
            <p>{review.createdAt}</p>
            <p>{review.review}</p>
          </>
        );
      })}
    </>
  );
};

export default ReviewIndex;

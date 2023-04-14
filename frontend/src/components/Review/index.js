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

  const month = [
    0,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const deleteReview = (e, reviewId) => {
    e.preventDefault()
    dispatch(deleteReviewThunk(reviewId))
  }

  let reviewMonth
  let year




  return (
    <>
      <h1>Manage Reviews</h1>
      {reviews.length && reviews.map((review) => {
        console.log("CURRENTREVIEW =>", review);
        reviewMonth = review.createdAt?.split("")[6];
        year = review.createdAt?.split("-")[0];
        return (
          <>
            <div className="review-block">
              <h4>{review.Spot?.name}</h4>
              <p>
                {month[reviewMonth]}, {year}
              </p>
              <p>{review?.review}</p>
              <button className="delete-review-button" onClick={(e) => deleteReview(e, review.id)}>Delete</button>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ReviewIndex;

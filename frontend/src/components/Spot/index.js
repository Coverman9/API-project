import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./Spot.css";
import { Link } from "react-router-dom";
import PostReviewModal from "../Modals/PostReviewModal";
import { deleteReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const SpotIndex = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const spotObj = useSelector((state) => state.spots);
  const reviewObj = useSelector((state) => state.reviews);
  const review = Object.values(reviewObj);
  const spot = Object.values(spotObj);
  const { spotId } = useParams();
  const { closeModal } = useModal()

  let hasReviewd = review.find(rev => rev.userId === sessionUser.id)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch]);

  const deleteReview = (e, reviewId) => {
    e.preventDefault();
    dispatch(deleteReviewThunk(reviewId));
  };
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

  return (
    <>
      {spot.map((oneSpot) => {
        //console.log("ONESPOT ==>", oneSpot);
        return (
          <>
            <h1>{oneSpot.name}</h1>
            <p>
              Location: {oneSpot.city}, {oneSpot.state}, {oneSpot.country}
            </p>

            {oneSpot.SpotImages?.length ? (
              oneSpot.SpotImages.map((img) => (
                <img className="spot-detail-images" src={img.url}></img>
              ))
            ) : (
              <img src="https://ftcollinshomes.com/wp-content/uploads/2015/06/nophotoavailable.png"></img>
            )}
            <div className="wrapper-info-reserve">
              <div className="spot-info-div">
                <h4>
                  Hosted by: {oneSpot.Owner?.firstName}{" "}
                  {oneSpot.Owner?.lastName}
                </h4>
                <p>{oneSpot.description}</p>
              </div>
              <div className="reserve-button-div">
                <div className="price-div">
                  <p>${oneSpot.price} night</p>
                  <p>★ {oneSpot.avgStarRating?.toFixed(1)}</p>
                  <p>Reviews: {oneSpot.numReviews}</p>
                </div>
                <button
                  className="reserve-button"
                  onClick={() => alert("Feature coming soon")}
                >
                  Reserve
                </button>
              </div>
            </div>
            <hr />
            {oneSpot.avgStarRating !== 0 ? (
              <>
                {sessionUser?.id !== oneSpot.ownerId && sessionUser && !hasReviewd&&(
                  <OpenModalMenuItem
                    itemText="Post Your Review"
                    modalComponent={<PostReviewModal spotId={oneSpot.id} />}
                    buttonClassName="modal-component"
                  />
                )}
                <p>★ {oneSpot.avgStarRating?.toFixed(1)}</p>
                <p>Reviews: {oneSpot.numReviews}</p>
                <div className="spot-reviews">
                  {review.length > 0 &&
                    review.map((oneReview) => {
                      //console.log("ONEREVIE ==>", oneReview)
                      const reviewMonth = oneReview.createdAt.split("")[6];
                      const year = oneReview.createdAt.split("-")[0];
                      return (
                        <>
                          <div>
                            <p>{oneReview.User?.firstName}</p>
                            <p>
                              {month[reviewMonth]}, {year}
                            </p>
                            <p>{oneReview?.review}</p>
                            <p>⭐️ {oneReview?.stars}</p>
                            {sessionUser?.id === oneReview.User?.id && (
                              <>
                                <button
                                  className="delete-review-in-spot"
                                  onClick={(e) => deleteReview(e, oneReview.id)}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            ) : (
              <>
                <h3>★ New</h3>
                {sessionUser?.id !== oneSpot.ownerId && sessionUser && (
                  <OpenModalMenuItem
                    itemText="Post Your Review"
                    modalComponent={<PostReviewModal spotId={oneSpot.id}
                    onModalClose = {closeModal} />}
                    buttonClassName="modal-component"
                  />
                )}
                <h4>Be the first to post a review!</h4>
              </>
            )}
          </>
        );
      })}
    </>
  );
};

export default SpotIndex;

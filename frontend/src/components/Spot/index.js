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
import DeleteReviewModal from "../Modals/DeleteReviewModal";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createBookingThunk } from "../../store/bookings";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SpotIndex = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errors, setErrors] = useState({});
  let year = new Date().getFullYear().toString();
  let month2 = new Date().getMonth();
  let day = new Date().getDate().toString();
  const sessionUser = useSelector((state) => state.session.user);
  const spotObj = useSelector((state) => state.spots);
  const reviewObj = useSelector((state) => state.reviews);
  const spot = Object.values(spotObj);
  const review = Object.values(reviewObj);
  const { spotId } = useParams();
  const { closeModal } = useModal();
  let hasReviewd = review.find((rev) => rev.userId === sessionUser?.id);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getSpotDetailThunk(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch]);

  // const deleteReview = (e, reviewId) => {
  //   e.preventDefault();
  //   dispatch(deleteReviewThunk(reviewId));
  // };
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

  const createReserve = async (e) => {
    e.preventDefault();
    if (!sessionUser) return setErrors({message: "Please Log in first"})
    if (spot.map((owner) => owner.ownerId).includes(sessionUser.id)) {
      setErrors({
        message: "Can't create booking for your own property",
      });
    }
    await dispatch(
      createBookingThunk({
        spotId,
        startDate,
        endDate,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <>
      {spot.map((oneSpot) => {
        return (
          <>
            <h1 className="spot-name-h1">{oneSpot.name}</h1>
            <p>
              Location: {oneSpot.city}, {oneSpot.state}, {oneSpot.country}
            </p>
            <div className="spot-images-styling">
              <div className="preview-image-div">
                <img src={oneSpot.SpotImages?.[0]?.url}></img>
              </div>
              <div className="spot-images-div">
                {oneSpot.SpotImages?.length ? (
                  oneSpot.SpotImages.slice(1).map((img) => (
                    <img className="spot-detail-images" src={img.url}></img>
                  ))
                ) : (
                  <img src="https://ftcollinshomes.com/wp-content/uploads/2015/06/nophotoavailable.png"></img>
                )}
              </div>
            </div>
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
                <div className="reserve-checkinout">
                  <div>
                    CHECK-IN:
                    <label>
                      <input
                        type="date"
                        name="check-in"
                        min={`${year}-0${(month2 + 1).toString()}-${day}`}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                      <span class="validity"></span>
                    </label>
                  </div>
                  <div>
                    CHECKOUT:
                    <label>
                      <input
                        type="date"
                        name="checkout"
                        min={`${year}-0${(month2 + 1).toString()}-${day}`}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                      <span class="validity"></span>
                    </label>
                  </div>
                </div>
                <div style={{ color: "red" }}>
                  {errors && errors.startDate}
                  {errors && errors.endDate}
                  {errors && errors.message}
                </div>
                <button className="reserve-button" onClick={createReserve}>
                  Reserve
                </button>
              </div>
            </div>
            <hr />
            {oneSpot.avgStarRating !== 0 ? (
              <>
                {sessionUser?.id !== oneSpot.ownerId &&
                  sessionUser &&
                  !hasReviewd && (
                    <OpenModalMenuItem
                      itemText="Post Your Review"
                      modalComponent={<PostReviewModal spotId={oneSpot.id} />}
                      buttonClassName="modal-component"
                    />
                  )}
                <div className="review-info-block">
                  <div className="star-review">
                    ★ {oneSpot.avgStarRating?.toFixed(1)}
                  </div>
                  <div>·</div>
                  {oneSpot.numReviews === 1 ? (
                    <div>{oneSpot.numReviews} review</div>
                  ) : (
                    <div>{oneSpot.numReviews} reviews</div>
                  )}
                </div>
                <div className="spot-reviews">
                  {review.length > 0 &&
                    review.map((oneReview) => {
                      //console.log("ONEREVIE ==>", oneReview)
                      const reviewMonth = oneReview.createdAt?.split("")[6];
                      const year = oneReview.createdAt?.split("-")[0];
                      return (
                        <>
                          <div className="spot-review">
                            <div className="spot-review-name">
                              <p>{oneReview.User?.firstName}</p>
                            </div>
                            <div className="spot-review-date">
                              <p>
                                {month[reviewMonth]}, {year}
                              </p>
                            </div>
                            <div className="spot-review-review">
                              <p>{oneReview?.review}</p>
                            </div>
                            <div className="spot-review-stars">
                              <p>★ {oneReview?.stars}</p>
                            </div>
                            {sessionUser?.id === oneReview.User?.id && (
                              <>
                                <div className="delete-review-button">
                                  <OpenModalMenuItem
                                    itemText="Delete"
                                    modalComponent={
                                      <DeleteReviewModal
                                        reviewId={oneReview.id}
                                        spotId={spotId}
                                      />
                                    }
                                  />
                                </div>
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
                    modalComponent={
                      <PostReviewModal
                        spotId={oneSpot.id}
                        onModalClose={closeModal}
                      />
                    }
                    buttonClassName="modal-component"
                  />
                )}
                <h4 style={{ marginTop: "20px" }}>
                  Be the first to post a review!
                </h4>
              </>
            )}
          </>
        );
      })}
    </>
  );
};

export default SpotIndex;

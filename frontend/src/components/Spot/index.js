import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import "./Spot.css";
import { Link } from "react-router-dom";
import PostReviewModal from "../Modals/PostReviewModal";

const SpotIndex = () => {
  const sessionUser = useSelector((state) => state.session.user)
  const spotObj = useSelector((state) => state.spots);
  const reviewObj = useSelector((state) => state.reviews);
  const review = Object.values(reviewObj);
  const spot = Object.values(spotObj);
  const id = useParams();

  //console.log("rev", review);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotDetailThunk(id.spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(id.spotId));
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
                  <p>★ {oneSpot.avgStarRating}</p>
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
                <p>★ {oneSpot.avgStarRating}</p>
                <p>Reviews: {oneSpot.numReviews}</p>
                <div className="spot-reviews">
                  {review.map((oneReview) => {
                    const reviewMonth = oneReview.createdAt.split("")[6];
                    const year = oneReview.createdAt.split("-")[0];
                    return (
                      <>
                        <div>
                          <p>{oneReview.User.firstName}</p>
                          <p>
                            {month[reviewMonth]}, {year}
                          </p>
                          <p>{oneReview.review}</p>
                          <p>⭐️ {oneReview.stars}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
              <h3>★ New</h3>
              {sessionUser && (<OpenModalMenuItem
              itemText="Post Your Review"
              modalComponent={<PostReviewModal spotId = {oneSpot.id}/>} />
              )}</>
            )}
          </>
        );
      })}
    </>
  );
};

export default SpotIndex;

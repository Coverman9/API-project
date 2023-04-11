import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailThunk } from "../../store/spots";
import { getAllReviewsThunk } from "../../store/reviews";
import "./Spot.css";
import { Link } from "react-router-dom";

const SpotIndex = () => {
  const spotObj = useSelector((state) => state.spots);
  const reviewObj = useSelector(state => state.reviews)
  const review = Object.values(reviewObj)
  const spot = Object.values(spotObj);
  const id = useParams();

  console.log("rev",review)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotDetailThunk(id.spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllReviewsThunk(id.spotId))
  }, [dispatch])


  return (
    <>
      {spot.map((oneSpot) => {
        console.log("ONESPOT ==>", oneSpot)
        return (
          <>
            <h1>{oneSpot.name}</h1>

            {oneSpot.SpotImages?.length ? oneSpot.SpotImages.map((img) => (
              <img src={img.url}></img>
            )): <img src="https://ftcollinshomes.com/wp-content/uploads/2015/06/nophotoavailable.png"></img>}
            <p>Address: {oneSpot.address}</p>
            <p>Location: {oneSpot.city},  {oneSpot.state}, {oneSpot.country}</p>
            <h4>Hosted by: {oneSpot.Owner?.firstName} {oneSpot.Owner?.lastName}</h4>
            <p>Paragraph: {oneSpot.description}</p>
            <p>Price: ${oneSpot.price}</p>
            <button onClick={() => alert("Feature coming soon")}>Reserve</button>
            <hr/>
            <p>Reviews: {oneSpot.numReviews}</p>
            <div className="spot-reviews">
              {review.map(oneReview => {
                return (
                  <>
                    <div>
                      <p>{oneReview.review}</p>
                      <p>⭐️ {oneReview.stars}</p>
                    </div>
                  </>
                )
              })}
            </div>
          </>
        );
      })}
    </>
  );
};

export default SpotIndex;

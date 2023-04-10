import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailThunk } from "../../store/spots";
import "./Spot.css";
import { Link } from "react-router-dom";

const SpotIndex = () => {
  const spotObj = useSelector((state) => state.spots);
  const spot = Object.values(spotObj);
  console.log(spot);
  const id = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotDetailThunk(id.spotId));
  }, [dispatch]);


  return (
    <>
      {spot.map((oneSpot) => {
        return (
          <>
            <h1>{oneSpot.name}</h1>

            {oneSpot.SpotImages?.map((img) => (
              <img src={img.url}></img>
            ))}
            <p>Address: {oneSpot.address}</p>
            <p>City: {oneSpot.city}</p>
            <p>Country: {oneSpot.country}</p>
            <p>State: {oneSpot.state}</p>
            <p>Price: ${oneSpot.price}</p>
            <p>Reviews: {oneSpot.numReviews}</p>
          </>
        );
      })}
    </>
  );
};

export default SpotIndex;

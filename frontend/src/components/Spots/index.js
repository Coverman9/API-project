import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./Spots.css";
import { Link } from "react-router-dom";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);
  console.log(spots);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>All spots</h1>
      {spots.map((spot) => {
        return (
          <>
            <div className="spots-div">
              <Link to={`/spot/${spot.id}`}>
                <img src={spot.previewImage}></img>
              </Link>
              <p key={spot.id}>
                {spot.name}, {spot.city}
              </p>
              <p>${spot.price} night</p>
              <p>⭐️ {spot.avgRating}</p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default SpotsIndex;

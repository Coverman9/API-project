import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import "./Spots.css";
import { Link } from "react-router-dom";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);
  console.log("image check", spots);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>All spots</h1>
      <div className="wrapper-div">
        {spots.map((spot) => {
          return (
            <>
              <div className="spots-div">
                <Link to={`/spot/${spot.id}`}>
                  {spot.previewImage !== "No Preview Image Available" ? <img src={spot.previewImage}></img> :
                  <img src="https://ftcollinshomes.com/wp-content/uploads/2015/06/nophotoavailable.png"></img>}

                  <div key={spot.id}>
                    {spot.name}, {spot.city}, {spot.state}
                  </div>
                  <div>${spot.price} night</div>
                  <div>⭐️ {spot.avgRating}</div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SpotsIndex;

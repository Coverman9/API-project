import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";

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
            <p>{spot.name}</p>
            <img src={spot.previewImage}></img>
          </>
        );
      })}
    </>
  );
};

export default SpotsIndex;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./CreateUpdate.css";

const EditSpot = () => {
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots);
  const id = parseInt(spotId);
  const spotRess = spots[spotId];

  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState(spotRess?.country || "");
  const [address, setAddress] = useState(spotRess?.address || "");
  const [city, setCity] = useState(spotRess?.city || "");
  const [state, setState] = useState(spotRess?.state || "");
  const [lat, setLatitude] = useState(spotRess?.lat || 0);
  const [lng, setLongitude] = useState(spotRess?.lng || 0);
  const [description, setDescription] = useState(spotRess?.description || "");
  const [name, setName] = useState(spotRess?.name || "");
  const [image, setImage] = useState([]);
  const [price, setPrice] = useState(spotRess?.price || 0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateSpotThunk({
        country,
        address,
        city,
        state,
        lat: Number(lat),
        lng: Number(lng),
        description,
        name,
        price,
        spotId,
      })
    )
      .then((newSpot) => history.push(`/spot/${newSpot.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };
  return (
    <>
      <div className="create-update-main-div">
        <h1>Edit Spot</h1>
        {errors.description && (
          <p className="cr-up-errors">{errors.description}</p>
        )}
        {errors.lat && (
          <p className="cr-up-errors">{errors.lat} for Latitude</p>
        )}
        {errors.lng && (
          <p className="cr-up-errors">{errors.lng} for Longitude</p>
        )}
        <form onSubmit={handleSubmit} className="create-update-form">
          <h4>Where's your place located?</h4>
          <p className="firstCapion">
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Street Address
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <div className="city-state-div">
            <label>
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label>
              State
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="lng-lat-div">
            <label>
              Latitude
              <input
                type="text"
                value={lat}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </label>
            <label>
              Longitude
              <input
                type="text"
                value={lng}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <label>
            Describe your place to guests
            <textarea
              type="text"
              placeholder="Please write at least 30 characters"
              value={description}
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <hr />
          <label>
            Create a title for your spot
            <input
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Set a base price for your spot
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Liven up your spot with photos
            <input
              type="text"
              placeholder="Preview Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
             <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
             <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
             <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
             <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            /> */}
          </label>
          <button type="submit" className="create-update-button">
            Update Spot
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSpot;

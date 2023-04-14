import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./CreateUpdate.css";

function CreateNewSpot({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLatitude] = useState(0);
  const [lng, setLongitude] = useState(0);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState({
    prevImg: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(
      createNewSpotThunk({
        country,
        address,
        city,
        state,
        lat: Number(lat),
        lng: Number(lng),
        description,
        name,
        price,
        image,
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
        <h1>Creat a New Spot</h1>
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
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Street Address
            <input
              type="text"
              value={address}
              placeholder="Address"
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
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label>
              State
              <input
                type="text"
                value={state}
                placeholder="STATE"
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
                placeholder="Latitude"
                onChange={(e) => setLatitude(e.target.value)}
              />
            </label>
            <label>
              Longitude
              <input
                type="text"
                value={lng}
                placeholder="Longitude"
                onChange={(e) => setLongitude(e.target.value)}
              />
            </label>
          </div>
          <hr />
          <label>
            <h4>Describe your place to guests</h4>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
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
            <h4>Create a title for your spot</h4>
            <p>
              Catch guests attention with a spot title that highlights what
              makes your place special.
            </p>
            <input
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <h4>Set a base price for your spot</h4>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            <h4>Liven up your spot with photos</h4>
            <p>Submit a link to at least one photo to publish your spot</p>
            <input
              type="text"
              placeholder="Preview Image URL"
              value={image.prevImg}
              onChange={(e) =>
                setImage((prevState) => ({
                  ...prevState,
                  prevImg: e.target.value,
                }))
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image.img2}
              onChange={(e) =>
                setImage((prevState) => ({
                  ...prevState,
                  img2: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image.img3}
              onChange={(e) =>
                setImage((prevState) => ({
                  ...prevState,
                  img3: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image.img4}
              onChange={(e) =>
                setImage((prevState) => ({
                  ...prevState,
                  img4: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image.img5}
              onChange={(e) =>
                setImage((prevState) => ({
                  ...prevState,
                  img5: e.target.value,
                }))
              }
            />
          </label>
          <hr />
          <button type="submit" className="create-update-button">
            Create Spot
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateNewSpot;

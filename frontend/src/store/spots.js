import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_SPOT_DETAIL = "spots/LOAD_SPOT_DETAIL"
export const CREATE_NEW_SPOT = "spots/CREATE_NEW_SPOT"
export const CURRENT_SPOTS = "spots/CURRENT_SPOTS"

export const loadSpotsAction = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpotDetailAction = (spot) => ({
  type: LOAD_SPOT_DETAIL,
  spot
})

export const createNewSpotAction = (spot) => ({
  type: CREATE_NEW_SPOT,
  spot
})

export const loadCurrentSpotsAction = (spots) => ({
  type: CURRENT_SPOTS,
  spots
})

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const spots = await res.json();
  await dispatch(loadSpotsAction(spots.Spots));
};

export const getSpotDetailThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  const spot = await res.json()
  await dispatch(loadSpotDetailAction(spot))
}

export const getCurrentSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current")
  const spots = await res.json()
  await dispatch (loadCurrentSpotsAction(spots.Spots))
}

export const createNewSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
  })
  console.log(res)
  if(res.ok) {
    const newSpot = await res.json()
    dispatch(createNewSpotAction(newSpot))
    return newSpot
  } else {
    const errors = await res.json()
    return errors
  }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOTS:
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    case LOAD_SPOT_DETAIL:
      newState[action.spot.id] = action.spot
      return newState
    case CREATE_NEW_SPOT:
      newState = {...state}
      newState[action.spot.id] = action.spot
      return newState
    case CURRENT_SPOTS:
      action.spots.forEach((spot) => (newState[spot.id] = spot))
      return newState
    default:
      return state;
  }
};

export default spotsReducer;

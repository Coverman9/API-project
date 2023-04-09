export const LOAD_SPOTS = "spots/LOAD_SPOTS";

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  const spots = await res.json();
  await dispatch(loadSpots(spots.Spots));
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  const newState = {};
  switch (action.type) {
    case LOAD_SPOTS:
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;

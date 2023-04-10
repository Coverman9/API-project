export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const LOAD_SPOT_DETAIL = "spots/LOAD_SPOT_DETAIL"

export const loadSpotsAction = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpotDetailAction = (spot) => ({
  type: LOAD_SPOT_DETAIL,
  spot
})

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  const spots = await res.json();
  await dispatch(loadSpotsAction(spots.Spots));
};

export const getSpotDetailThunk = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`)
  const spot = await res.json()
  await dispatch(loadSpotDetailAction(spot))
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
    default:
      return state;
  }
};

export default spotsReducer;

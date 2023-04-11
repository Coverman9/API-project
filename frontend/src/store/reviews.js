import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const LOAD_REVIEW_DETAIL = "reviews/LOAD_REVIEW_DETAIL"

export const loadReviewsAction = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

// export const loadReviewDetailAction = (spot) => ({
//   type: LOAD_SPOT_DETAIL,
//   spot
// })

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await res.json();
  await dispatch(loadReviewsAction(reviews.Reviews));
};

// export const getReviewDetailThunk = (spotId) => async (dispatch) => {
//   const res = await fetch(`/api/spots/${spotId}`)
//   const spot = await res.json()
//   await dispatch(loadSpotDetailAction(spot))
// }

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_REVIEWS:
      action.reviews.forEach((review) => (newState[review.id] = review));
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;

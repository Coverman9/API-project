import { csrfFetch } from "./csrf";

export const CURRENT_USER_BOOKINGS = "bookings/CURRENT_USER_BOOKINGS";

export const loadCurrentUserBookingsAction = (bookings) => ({
  type: CURRENT_USER_BOOKINGS,
  bookings,
});

export const getCurrentUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/bookings/current");
  const bookings = await res.json();
  if (bookings.Bookings[0].id) {
    await dispatch(loadCurrentUserBookingsAction(bookings.Bookings));
  } else {
    await dispatch(loadCurrentUserBookingsAction([]));
  }
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CURRENT_USER_BOOKINGS:
      action.bookings.forEach((booking) => (newState[booking.id] = booking));
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer

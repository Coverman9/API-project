import { csrfFetch } from "./csrf";

export const CURRENT_USER_BOOKINGS = "bookings/CURRENT_USER_BOOKINGS";
export const CREATE_BOOKING = "bookings/CREATE_BOOKING";
export const DELETE_BOOKING = "bookings/DELETE_BOOKING";

export const loadCurrentUserBookingsAction = (bookings) => ({
  type: CURRENT_USER_BOOKINGS,
  bookings,
});

export const createBookingAction = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const deleteBookingAction = (booking) => ({
  type: DELETE_BOOKING,
  booking,
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

export const createBookingThunk =
  ({ spotId, startDate, endDate }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    });

    if (res.ok) {
      const newBooking = await res.json();
      dispatch(createBookingAction(newBooking));
      return newBooking;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteBookingAction(bookingId));
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case CURRENT_USER_BOOKINGS:
      action.bookings.forEach((booking) => (newState[booking.id] = booking));
      return newState;
    case CREATE_BOOKING:
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    case DELETE_BOOKING:
      newState = { ...state };
      delete newState[action.booking];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;

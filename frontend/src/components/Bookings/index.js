import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookingThunk,
  getCurrentUserBookingsThunk,
} from "../../store/bookings";
import "./Bookings.css";

const Bookings = () => {
  const bookingsObj = useSelector((state) => state.bookings);
  const bookings = Object.values(bookingsObj);
  const [errors, setErrors] = useState({});

  console.log(errors);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserBookingsThunk());
  }, [dispatch]);

  const onClick = async (e, bookingId) => {
    e.preventDefault();
    return dispatch(deleteBookingThunk(bookingId)).catch(async (res) => {
      const data = await res.json();
      if (data && data.message) {
        setErrors({message: data.message, bookingId});
      }
    });
  };
  return (
    <>
      <h1>Manage Bookings</h1>
      {bookings.map((booking) => {
        return (
          <>
            <div>
              <div className="booking-spot-info">
                <img
                  className="booking-spot-image"
                  src={booking?.Spot?.previewImage}
                />
                <div>
                  <h3>{booking?.Spot?.name}</h3>
                  <h3>
                    {booking?.Spot?.city}, {booking?.Spot?.country}{" "}
                    {booking?.Spot?.state}
                  </h3>
                  <h3>State Date: {booking.startDate.slice(0, 10)}</h3>
                  <h3>End Date: {booking.endDate.slice(0, 10)}</h3>
                  {errors && booking.id === errors.bookingId && (
                    <p style={{color:"red", fontWeight:"bold"}}>{errors.message}</p>
                  )}
                  <button
                    className="cancel-book"
                    onClick={(e) => onClick(e, booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Bookings;

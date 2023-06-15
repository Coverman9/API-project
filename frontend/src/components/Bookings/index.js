import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserBookingsThunk } from "../../store/bookings";
import "./Bookings.css";

const Bookings = () => {
  const bookingsObj = useSelector((state) => state.bookings);
  const bookings = Object.values(bookingsObj);

  console.log(bookings);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserBookingsThunk());
  }, [dispatch]);

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
                  src={booking.Spot.previewImage}
                />
                <div>
                  <h3>{booking.Spot.name}</h3>
                  <h3>{booking.Spot.city}, {booking.Spot.country} {booking.Spot.state}</h3>
                  <h3>State Date: {booking.startDate}</h3>
                  <h3>End Date: {booking.endDate}</h3>
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

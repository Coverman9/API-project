// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="home-ul">
      <li className="home-button">
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && (
        <li className="profile-button">
          <div className="profile-button-div">
            <ProfileButton user={sessionUser} />
          </div>
        </li>
      )}
    </ul>
  );
}

export default Navigation;

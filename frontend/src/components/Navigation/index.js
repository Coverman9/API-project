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
          <div className="logo-div">
            <img
              className="main-logo"
              src="https://as2.ftcdn.net/v2/jpg/01/20/74/39/1000_F_120743954_iv7ismy8joYb2gdDaaFrv748S0nldqvB.jpg"
            />
          </div>
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

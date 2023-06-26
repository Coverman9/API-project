// frontend/src/components/Navigation/index.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./moelogo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <ul className="home-ul">
      <li className="home-button">
        <NavLink exact to="/">
          <div className="logo-div">
            <img className="main-logo" src={logo} />
            <span className="airdnd-span">airdnd</span>
          </div>
        </NavLink>
      </li>
      <li className="github-button">
        <a className="logo-div" href="https://github.com/Coverman9/AirDnd-project">
          <i class="fa-brands fa-github fa-2xl"></i>
        </a>
      </li>
      <li className="linkedin-button">
        <a className="logo-div" href="https://www.linkedin.com/in/emir-usubaliev-5904b0235/">
          <i class="fa-brands fa-linkedin fa-2xl"></i>
        </a>
      </li>
      {isLoaded && (
        <li className="profile-button-li">
          <div className="create-and-profile-div">
            <div className="profile-button-div">
              <ProfileButton user={sessionUser} />
            </div>
            <div>
              {sessionUser && (
                <Link to={"/spots/new"}>
                  <div className="create-new-spot-button">
                    Create a New Spot
                  </div>
                </Link>
              )}
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}

export default Navigation;

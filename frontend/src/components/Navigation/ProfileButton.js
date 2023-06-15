import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        ≡ <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>
              Hello {user.firstName} {user.lastName}!
            </li>
            <li>email: {user.email}</li>
            <hr />
            <li onClick={closeMenu}>
              <div className="manage-spots-link">
                <Link to={"/spots/current"}>Manage Spots</Link>
              </div>
            </li>
            <hr />
            <li onClick={closeMenu}>
              <div className="manage-spots-link">
                <Link to={"/reviews/current"}>Manage Reviews</Link>
              </div>
            </li>
            <hr />
            <li onClick={closeMenu}>
              <div className="manage-spots-link">
                <Link to={"/bookings/current"}>Manage Bookings</Link>
              </div>
            </li>
            <hr />
            <li>
              <button className="logout-button" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              buttonClassName="modal-component"
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              buttonClassName="modal-component"
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

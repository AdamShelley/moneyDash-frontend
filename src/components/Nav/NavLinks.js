import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import Modal from "../utils/Modal";
import NavLinkComp from "./NavLink";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);

  const logoutHandler = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <React.Fragment>
      <Modal
        asOverlay
        show={showModal}
        onCancel={closeModal}
        className="modal__logout"
        header="Are you sure you want to logout?"
        headerClass="modal__logout--header"
        contentClass="modal__logout--content"
        footerClass="auth-logout-footer"
        footer={
          <div className="modal__logout--buttons">
            <button onClick={auth.logout}>Logout</button>
            <button className="btn btn-cancel-logout" onClick={closeModal}>
              Cancel
            </button>
          </div>
        }
      ></Modal>
      <div className="nav-links">
        {auth.isLoggedIn && (
          <ul>
            <NavLink activeClassName="page-selected" to="/" exact>
              <NavLinkComp iconName="fas fa-home">Dashboard</NavLinkComp>
            </NavLink>
            <NavLink activeClassName="page-selected" to="/accounts">
              <NavLinkComp iconName="far fa-user">Accounts</NavLinkComp>
            </NavLink>
            <NavLink activeClassName="page-selected" to="/Logger">
              <NavLinkComp iconName="fas fa-credit-card">Logger</NavLinkComp>
            </NavLink>
            <NavLink activeClassName="page-selected" to="/settings">
              <NavLinkComp iconName="fas fa-cog">Settings</NavLinkComp>
            </NavLink>
            <li className="logout-li">
              <button className="btn-logout" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        )}
        {!auth.isLoggedIn && (
          <NavLink activeClassName="page-selected" to="/auth" exact>
            <NavLinkComp iconName="fas fa-home">Login</NavLinkComp>
          </NavLink>
        )}
      </div>
    </React.Fragment>
  );
};

export default NavLinks;

import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/header-style.css';
import logo from '../img/auctioneerlogga.png';

const Header = () => {
  return (
    <nav className="nav-wrapper">
        <img className="logo" src={logo} alt="" />
        <ul className="navlist">
          <li>
            <NavLink className="home" to="/">Hem</NavLink>
          </li>
          <li>
            <NavLink className="sell" to="/sell">Sälja</NavLink>
          </li>
          <li>
            <NavLink className="about" to="/about">Om oss</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default Header;

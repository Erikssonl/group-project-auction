import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/home">Hem</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sälja</NavLink>
          </li>
          <li>
            <NavLink to="/about">Om oss</NavLink>
          </li>
        </ul>
    </nav>
  );
};

export default Header;

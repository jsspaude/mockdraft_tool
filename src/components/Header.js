/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { isLoggedIn } = useContext(props.authContext);
  return (
    <ul className="nav">
      {props.routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))}
      {isLoggedIn && (
        <li>
          <Link to="/draft">Draft Room</Link>
        </li>
      )}
    </ul>
  );
};

export default Header;

/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Context';

const Header = (props) => {
  const [uid, setUid] = useContext(AuthContext);
  console.log(uid);
  return (
    <ul className="nav">
      {/* {props.routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))} */}
      <li>Nope</li>
      {uid && (
        <li>
          {/* <Link to="/draft">Draft Room</Link> */}
          Test
        </li>
      )}
    </ul>
  );
};

export default Header;

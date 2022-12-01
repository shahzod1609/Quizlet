import { Button } from 'bootstrap';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MaodalApp from '../../../modal/MaodalApp';
import { AuthContext } from '../../context/auth-context'
import DropDown from './DropDown';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Esasy</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/add-module" >Modul goş</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <NavLink to="/folder">Bukjalar</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/signup">Agza bol</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/login">Içeri gir</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li className="log-out-hedden">
        <button onClick={auth.logout}>Çykmak</button>
      </li>
    )}
    {auth.isLoggedIn && (
      <li className="log-out-hedden">
        <button onClick={()=>navigate('/profile')}>Profile</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
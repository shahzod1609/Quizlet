import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';
import { AuthContext } from '../../context/auth-context';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
let firstToSecond = 0, tt = 'i0'

const MainNavigation = props => {

  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoginMode, setisLoginMode] = useState(true)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const onSubmit = (e) => {

    e.preventDefault()
    navigate(`/search?search=${e.target[0].value}`)
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Quiz</Link>
        </h1>
        {
          auth.isLoggedIn &&
          <div className={`search_bar${isLoginMode ? `${tt}` : 'i1'}`}>

            <form onSubmit={onSubmit}>
              <input className={`${isLoginMode ? `${tt}` : 'i1'}`} placeholder="Gozleg..." type="text" />
            </form>
            <div className={`search${isLoginMode ? `${tt}` : 'i1'}`} onClick={() => {
              if (firstToSecond === 0) {
                tt = 'i2'
                firstToSecond++;
              }
              isLoginMode ? setisLoginMode(false) : setisLoginMode(true)
            }}>
            </div>

          </div>

        }

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <div className="avatar-in-main-navidation">
          {auth.isLoggedIn && (
            <div className="flex-for-neverland">
              <div className="log-ou">
                <div onClick={auth.logout}><div className="log-out-icon"></div></div>
              </div>
              <div className="avatar-sircle-for-corner">
                <Link to='/profile'>
                  <Avatar src={auth.image ? `http://${auth.url}/${auth.image}` : ''} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;

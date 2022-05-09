import React, { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { ProjectFilter } from '../ProjectFilter/ProjectFilter';
import { SearchInput } from '../SearchInput/SearchInput';
import { PageLogo } from '../PageLogo/PageLogo';
import './Header.css';
import { LoginButton } from '../LoginButton/LoginButton';
import { OrderFilter } from '../OrderFilter/OrderFilter';
import { UserSessionContext } from '../../context/UserSessionContext';
import { UserPicture } from '../UserPicture/UserPicture';
import {
  USER_JWT_COOKIE_NAME,
  USER_LOCAL_STORAGE_NAME,
} from '../../utils/environmental';
import { eliminarCookie } from '../../utils/cookieUtils';
const Header = ({ addFilters, addSearcher }) => {
  const { user, setUser, setUserToken } = useContext(UserSessionContext);
  const [displayUserIconMenu, setDisplayUserIconMenu] = useState(false);
  const { logout } = useAuth0();
  const logoutHandler = () => {
    setUser(undefined);
    localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    setUserToken('');
    eliminarCookie(USER_JWT_COOKIE_NAME);
    logout({ returnTo: window.location.origin });
  };

  return (
    <header className='header'>
      <PageLogo />
      {addSearcher && <SearchInput />}
      {addSearcher && addFilters ? <ProjectFilter /> : ''}
      {addSearcher && addFilters ? <OrderFilter /> : ''}

      {user ? (
        <div className='header__nav'>
          {!addSearcher && (
            <Link className='header__link' to='/search'>
              Explore
            </Link>
          )}
          <div className='header__user-picture'>
            <div
              className='header__user-picture__image'
              onClick={() => setDisplayUserIconMenu(!displayUserIconMenu)}
            >
              <UserPicture pictureUrl={user.pictureUrl} />
            </div>
            {displayUserIconMenu && (
              <div className='user-picture-menu'>
                <p className='user-picture-menu__link' onClick={logoutHandler}>
                  LogOut
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='header__nav'>
          {!addSearcher && (
            <Link className='header__link' to='/search'>
              Explore
            </Link>
          )}
          <LoginButton />
        </div>
      )}
    </header>
  );
};

export { Header };

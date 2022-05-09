import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Login } from '../services/LoginService';
import {
  USER_JWT_TIME_EXPIRATON,
  USER_JWT_COOKIE_NAME,
  USER_LOCAL_STORAGE_NAME,
} from '../utils/environmental';
import {
  addCookie,
  eliminarCookie,
  getCookieValue,
} from '../utils/cookieUtils';
const UserSessionContext = React.createContext();

const UserSessionProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [oauthToken, setOauthToken] = useState();
  const [userToken, setUserToken] = useState(
    getCookieValue({ key: USER_JWT_COOKIE_NAME }) || ''
  );
  const [user, setUser] = useState(
    localStorage.getItem(USER_LOCAL_STORAGE_NAME) !== null &&
      localStorage.getItem(USER_LOCAL_STORAGE_NAME) !== undefined
      ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_NAME))
      : undefined
  );
  useEffect(() => {
    if (userToken === '' && user !== undefined) {
      setUser(undefined);
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    }
    if (user === undefined && userToken !== '') {
      setUserToken('');
      eliminarCookie(USER_JWT_COOKIE_NAME);
    }
    if ((userToken === '' || user === undefined) && isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        setOauthToken(token);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      (userToken === '' || user === undefined) &&
      oauthToken !== '' &&
      oauthToken !== undefined &&
      oauthToken !== null
    ) {
      Login({ oauthToken }).then(({ token, user }) => {
        setUserToken(token);
        setUser(user);
        addCookie({
          key: USER_JWT_COOKIE_NAME,
          value: token,
          expirationTime: USER_JWT_TIME_EXPIRATON,
        });
        localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
      });
    }
  }, [oauthToken]);

  useEffect(() => {
    if (user === null || user === undefined) {
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    } else {
      localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
    }
  }, [user]);
  return (
    <UserSessionContext.Provider
      value={{ userToken, setUserToken, user, setUser }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export { UserSessionContext, UserSessionProvider };

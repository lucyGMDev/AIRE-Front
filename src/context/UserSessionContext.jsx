import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Login } from '../services/LoginService';
import {
  USER_JWT_TIME_EXPIRATON,
  USER_JWT_COOKIE_NAME,
  USER_COOKIE_NAME,
} from '../utils/environmental';
import { addCookie, getCookieValue, cookieExists } from '../utils/cookieUtils';
const UserSessionContext = React.createContext();

const UserSessionProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [oauthToken, setOauthToken] = useState();
  const [userToken, setUserToken] = useState(
    getCookieValue({ key: USER_JWT_COOKIE_NAME }) || ''
  );
  const [user, setUser] = useState(
    cookieExists({ key: USER_COOKIE_NAME })
      ? JSON.parse(getCookieValue({ key: USER_COOKIE_NAME }))
      : undefined
  );
  useEffect(() => {
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
        addCookie({
          key: USER_COOKIE_NAME,
          value: JSON.stringify(user),
          expirationTime: USER_JWT_TIME_EXPIRATON,
        });
      });
    }
  }, [oauthToken]);

  useEffect(() => {
    addCookie({
      key: USER_COOKIE_NAME,
      value: JSON.stringify(user),
      expirationTime: USER_JWT_TIME_EXPIRATON,
    });
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

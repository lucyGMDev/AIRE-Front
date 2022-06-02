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
import { UserExistsEmail } from '../services/GetUser';
const UserSessionContext = React.createContext();

const UserSessionProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [oauthToken, setOauthToken] = useState();
  const [userToken, setUserToken] = useState(
    getCookieValue({ key: USER_JWT_COOKIE_NAME }) || ''
  );
  const [signUp, setSignUp] = useState(false);
  const [userLogged, setUser] = useState(
    localStorage.getItem(USER_LOCAL_STORAGE_NAME) !== null &&
      localStorage.getItem(USER_LOCAL_STORAGE_NAME) !== undefined
      ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_NAME))
      : undefined
  );
  useEffect(() => {
    if (userToken === '' && userLogged !== undefined) {
      setUser(undefined);
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    }
    if (userLogged === undefined && userToken !== '') {
      setUserToken('');
      eliminarCookie(USER_JWT_COOKIE_NAME);
    }
    if ((userToken === '' || userLogged === undefined) && isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        setOauthToken(token);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      (userToken === '' || userLogged === undefined) &&
      oauthToken !== '' &&
      oauthToken !== undefined &&
      oauthToken !== null
    ) {
      UserExistsEmail({ userEmail: user.email }).then((exists) => {
        console.log(exists);
        if (exists) {
          Login({ oauthToken }).then(({ token, user }) => {
            console.log(user);
            setUserToken(token);
            setUser(user);
            addCookie({
              key: USER_JWT_COOKIE_NAME,
              value: token,
              expirationTime: USER_JWT_TIME_EXPIRATON,
            });
            localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(user));
          });
        } else {
          setSignUp(true);
        }
      });
    }
  }, [oauthToken, user]);

  useEffect(() => {
    if (userLogged === null || userLogged === undefined) {
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
    } else {
      localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(userLogged));
    }
  }, [userLogged]);
  return (
    <UserSessionContext.Provider
      value={{
        userToken,
        setUserToken,
        user: userLogged,
        setUser,
        oauthToken,
        signUp,
        setSignUp,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export { UserSessionContext, UserSessionProvider };

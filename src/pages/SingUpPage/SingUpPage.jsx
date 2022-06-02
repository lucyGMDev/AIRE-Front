import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { UserSessionContext } from '../../context/UserSessionContext';
import './SingUpPage.css';
import { eliminarCookie } from '../../utils/cookieUtils';
import {
  USER_JWT_COOKIE_NAME,
  USER_LOCAL_STORAGE_NAME,
} from '../../utils/environmental';
import { SignUp } from '../../services/LoginService';
import { UserExists } from '../../services/GetUser';
const SingUpPage = () => {
  const userNameInput = useRef();
  const navigator = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [userName, setUserName] = useState('');
  const { logout } = useAuth0();
  const { oauthToken, setUser, setUserToken } = useContext(UserSessionContext);
  const signUpHandler = async (evt) => {
    evt.preventDefault();
    if (userName.trim() === '') {
      setErrorMessage('Username can not be empty');
      userNameInput.current.blur();
      return;
    }
    const exists = await UserExists({ username: userName });
    if (exists) {
      setErrorMessage('There are another user with that email');
      userNameInput.current.blur();
      return;
    }
    const { token, user } = await SignUp({ oauthToken, username: userName });
    setUser(user);
    setUserToken(token);
    navigator('/');
  };
  useEffect(() => {
    if (oauthToken === undefined) {
      setUser(undefined);
      localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
      setUserToken('');
      eliminarCookie({ key: USER_JWT_COOKIE_NAME });
      logout({ returnTo: window.location.origin });
    }
  }, [oauthToken]);

  return (
    <main className='main-page'>
      <section className='singup'>
        <h1 className='blue-text singup__title'>Sing Up</h1>
        <form onSubmit={(evt) => signUpHandler(evt)}>
          <label className='blue-text singup__label'>Username</label>
          <input
            className='form__input singup__input'
            type='text'
            placeholder='Introduce a valid username...'
            value={userName}
            onChange={(evt) => setUserName(evt.target.value)}
            onFocus={() => setErrorMessage('')}
            ref={userNameInput}
          />
          {errorMessage !== '' && (
            <span className='signup__error-message'>{errorMessage}</span>
          )}
          <div className='singup__buttons'>
            <input type='submit' className='blue-button' value={'Sing Up'} />
            <input
              type='button'
              className='blue-button'
              value={'Cancel'}
              onClick={() => {
                setUser(undefined);
                localStorage.removeItem(USER_LOCAL_STORAGE_NAME);
                setUserToken('');
                eliminarCookie({ key: USER_JWT_COOKIE_NAME });
                logout({ returnTo: window.location.origin });
              }}
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export { SingUpPage };

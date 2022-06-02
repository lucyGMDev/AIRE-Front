import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LoginButton.css';

const LoginButton = ({ landing }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={loginWithRedirect}
      className={`login-button ${landing ? 'landing-button' : ''}`}
    >
      Login
    </button>
  );
};

export { LoginButton };

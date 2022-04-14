import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserSessionProvider } from './context/UserSessionContext';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='test-login-lucygmdev.eu.auth0.com'
      clientId='8MfXcCtOKaPJcb1nXio03whAvlqWC7C6'
      redirectUri={window.location.origin}
      audience='https://test-login-lucygmdev.eu.auth0.com/api/v2/'
      scope='openid profile email'
    >
      <UserSessionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserSessionProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

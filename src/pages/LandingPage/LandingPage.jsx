import React from 'react';
import { LoginButton } from '../../components/LoginButton/LoginButton';

import { SearchInput } from '../../components/SearchInput/SearchInput';
import './LandingPage.css';
const LandingPage = () => {
  return (
    <React.Fragment>
      <main className='landing-page'>
        <div className='top-circle'></div>
        <div className='bottom-circle'></div>
        <header className='landing-page__header'>
          <SearchInput />
        </header>
        <div className='page-info'>
          <div className='landing-page__login-menu'>
            <h1 className='landing-page__title'>AIRE</h1>
            <p className='landing-page__text'>Improve your AI development</p>
            <p className='landing-page__text'>
              Share your process with other developers and get feedback
            </p>
            <LoginButton landing />
          </div>
          <div className='landing-page__tags'>
            <p>Get feedback</p>
            <p>Share projects</p>
            <p>Develop your AI</p>
          </div>
        </div>
        <div className='landing-page__stats'>
          <div className='landing-page__stat'>
            <p>10K</p>
            <p>Projects</p>
          </div>
          <div className='landing-page__stat'>
            <p>6K</p>
            <p>Users</p>
          </div>
          <div className='landing-page__stat'>
            <p>60K</p>
            <p>Comments</p>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export { LandingPage };

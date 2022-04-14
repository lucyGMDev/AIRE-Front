import React, { useContext } from 'react';
import { ProjectFilter } from '../ProjectFilter/ProjectFilter';
import { SearchInput } from '../SearchInput/SearchInput';
import { PageLogo } from '../PageLogo/PageLogo';
import './Header.css';
import { LoginButton } from '../LoginButton/LoginButton';
import { OrderFilter } from '../OrderFilter/OrderFilter';
import { UserSessionContext } from '../../context/UserSessionContext';
import { UserPicture } from '../UserPicture/UserPicture';
const Header = ({ addFilters }) => {
  const { user } = useContext(UserSessionContext);
  return (
    <header className='header'>
      <PageLogo />
      <SearchInput />
      {addFilters ? <ProjectFilter /> : ''}
      {addFilters ? <OrderFilter /> : ''}
      {user ? <UserPicture pictureUrl={user.pictureUrl} /> : <LoginButton />}
    </header>
  );
};

export { Header };

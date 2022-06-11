import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetUserByUsername } from '../../services/UserServices';

import { UserPicture } from '../UserPicture/UserPicture';
import './Coauthor.css';
const Coauthor = ({ username }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    GetUserByUsername({ username }).then((user) => setUser(user));
  }, [username]);
  return (
    <React.Fragment>
      {user && (
        <article className='coauthor'>
          <Link to={`/user/${username}`} className='object-link '>
            <UserPicture pictureUrl={user.pictureUrl} />
          </Link>
        </article>
      )}
    </React.Fragment>
  );
};

export { Coauthor };

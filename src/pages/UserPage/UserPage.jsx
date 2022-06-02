import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { UserPicture } from '../../components/UserPicture/UserPicture';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useGetUserFiles } from '../../Hooks/useGetUserFiles';
import { GetUserByUsername } from '../../services/GetUser';
import './UserPage.css';

const UserPage = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const { userToken } = useContext(UserSessionContext);
  const { projects } = useGetUserFiles({
    userGetProjects: username,
    userToken,
  });
  useEffect(() => {
    GetUserByUsername({ username }).then((user) => setUser(user));
  }, [username]);

  return (
    <React.Fragment>
      <Header />
      {user && (
        <main className='user-page'>
          <section className='user__element user-info'>
            <div className='user-info__picture'>
              <UserPicture pictureUrl={user.pictureUrl} big />
            </div>
            <p className='user-info__username'>{user.username}</p>
            <p className='user-info__name'>
              <span className='user-info__label'>Name: </span>
              {user.name}
            </p>
            <p className='user-info__last_name'>
              <span className='user-info__label'>Last Name: </span>
              {user.lastName}
            </p>
            <p>
              <span className='user-info__label'>Signed on: </span>
              {user.createdDate}
            </p>
          </section>

          <section className='home__element user-projects'>
            {projects.length > 0 && <ProjectList projects={projects} />}
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export { UserPage };

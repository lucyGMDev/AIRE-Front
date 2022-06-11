import React, { useContext, useState } from 'react';
import { CreateProjectPanel } from '../../components/CreateProjectPanel/CreateProjectPanel';
import { Header } from '../../components/Header/Header';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { UserPicture } from '../../components/UserPicture/UserPicture';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useGetUserFiles } from '../../Hooks/useGetUserFiles';
import { UpdateUser } from '../../services/UserServices';
import './UserHome.css';
const UserHome = () => {
  const { user, userToken, setUser } = useContext(UserSessionContext);
  const [picturePath, setPicturePath] = useState('');
  const [creatingProject, setCreatingProject] = useState(false);
  const [userFirstName, setUserFirtName] = useState(user.name);
  const [userLastName, setUserLastName] = useState(user.lastName);
  const [userPicture, setUserPicture] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const { projects, setProjects } = useGetUserFiles({
    userGetProjects: user.username,
    userToken,
  });

  const userFirstNameOnChange = (evt) => {
    setUserFirtName(evt.target.value);
  };

  const userLastNameOnChange = (evt) => {
    setUserLastName(evt.target.value);
  };

  const editButtonHandle = () => {
    setEditProfile(true);
  };

  const editUserSubmit = (evt) => {
    evt.preventDefault();
    UpdateUser({
      userEmail: user.email,
      userFirstName,
      userLastName,
      userPicture,
      userToken,
    }).then((user) => {
      setUser(user);
      setEditProfile(false);
    });
  };

  const onChangeProfilePicture = (evt) => {
    setPicturePath(URL.createObjectURL(evt.target.files[0]));
    setUserPicture(evt.target.files[0]);
  };

  const cancelEdit = () => {
    setUserFirtName(user.name);
    setUserLastName(user.lastName);
    setEditProfile(false);
    setPicturePath('');
    setUserPicture(undefined);
  };
  return (
    <React.Fragment>
      <Header />
      <main className='home'>
        <section className='home__element user-info'>
          <UserPicture pictureUrl={user.pictureUrl} picture={picturePath} big />
          <p className='user-info__username'>{user.username}</p>
          {editProfile ? (
            <form onSubmit={editUserSubmit}>
              <label htmlFor='user-name'>Name </label>
              <input
                className='form__input'
                type='text'
                name='user-name'
                value={userFirstName}
                onChange={userFirstNameOnChange}
              />

              <label htmlFor='user-lastName'>Last Name </label>
              <input
                className='form__input'
                type='text'
                name='user-lastName'
                value={userLastName}
                onChange={userLastNameOnChange}
              />
              <label htmlFor='user-picture'>Picture</label>
              <input
                className='user-info__form-file'
                type='file'
                name='user-picture'
                accept='.jpg,.png,.jpeg,.webp,.bmp'
                onChange={onChangeProfilePicture}
              />

              <input
                className='button user-info__form-button'
                type='submit'
                value='Save'
              />
              <button
                onClick={cancelEdit}
                className='button user-info__form-button'
              >
                Cancel
              </button>
            </form>
          ) : (
            <React.Fragment>
              <p className='user-info__name'>
                <span className='user-info__title-info'>Name:</span> {user.name}
              </p>
              <p className='user-info__lastname'>
                <span className='user-info__title-info'>Last Name:</span>{' '}
                {user.lastName}
              </p>
              <button className='button' onClick={editButtonHandle}>
                Edit profile
              </button>
            </React.Fragment>
          )}
        </section>
        <section className='home__element user-projects'>
          {creatingProject ? (
            <div className='home__create-project-panel'>
              <CreateProjectPanel displayPanel={setCreatingProject} />
            </div>
          ) : (
            <React.Fragment>
              <article className='home__user-project-headers'>
                <SearchInput
                  searchUserProjects
                  username={user.username}
                  userToken={userToken}
                  setProjectSearched={setProjects}
                />
              </article>

              <ProjectList
                addCreateProjectPanel
                openCreatePanel={() => setCreatingProject(true)}
                projects={projects}
              />
            </React.Fragment>
          )}
        </section>
      </main>
    </React.Fragment>
  );
};

export { UserHome };

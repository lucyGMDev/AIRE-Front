import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import { SearchProject } from './pages/SearchProject/SearchProject';
import { FiltersProvider } from './context/FiltersContext';
import { ViewProject } from './pages/ViewProject/ViewProject';
import { ProjectProvider } from './context/ProjectProvider';
import { ViewItem } from './pages/ViewItem/ViewItem';
import { SelectedFilesProvider } from './context/SelectedFilesContext';
import { UserSessionContext } from './context/UserSessionContext';
import { UserHome } from './pages/UserHome/UserHome';
import { ViewFile } from './pages/ViewFile/ViewFile';
import { SingUpPage } from './pages/SingUpPage/SingUpPage';
import { UserPage } from './pages/UserPage/UserPage';
import { ShortUrlHandler } from './pages/ShortUrlHandler/ShortUrlHandler';
import { LandingPage } from './pages/LandingPage/LandingPage';
function App() {
  const { userToken, user, signUp, setSignUp } = useContext(UserSessionContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (signUp) {
      setSignUp(false);
      navigate('/signup');
    }
  }, [signUp]);
  return (
    <React.Fragment>
      <ProjectProvider>
        <Routes>
          <Route
            path='/'
            element={
              userToken !== '' && user !== undefined ? (
                <UserHome />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path='/:shortUrl' element={<ShortUrlHandler />}></Route>
          <Route
            path='/search'
            element={
              <FiltersProvider>
                <SearchProject />
              </FiltersProvider>
            }
          />
          <Route path='/project/:projectId' element={<ViewProject />} />
          <Route
            path='/project/:projectId/:itemName'
            element={
              <SelectedFilesProvider>
                <ViewItem />
              </SelectedFilesProvider>
            }
          />
          <Route
            path='/project/:projectId/:itemName/:fileName/fileViewer'
            element={<ViewFile />}
          />
          <Route path='/signup' element={<SingUpPage />}></Route>
          <Route path='/user/:username' element={<UserPage />}></Route>
        </Routes>
      </ProjectProvider>
    </React.Fragment>
  );
}

export default App;

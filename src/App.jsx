import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
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
function App() {
  const { userToken, user } = useContext(UserSessionContext);
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
                <h1>Landing page</h1>
              )
            }
          />
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
        </Routes>
      </ProjectProvider>
    </React.Fragment>
  );
}

export default App;

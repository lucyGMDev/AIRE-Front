import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import { SearchProject } from './pages/SearchProject/SearchProject';
import { FiltersProvider } from './context/FiltersContext';
import { ViewProject } from './pages/ViewProject/ViewProject';
import { ProjectProvider } from './context/ProjectProvider';
import { ViewItem } from './pages/ViewItem/ViewItem';
import { SelectFilesDownloadProvider } from './context/SelectFilesDownloadContext';
import { ViewFile } from './pages/ViewFile/ViewFile';
import { UserSessionContext } from './context/UserSessionContext';
import { UserHome } from './pages/UserHome/UserHome';
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
              <SelectFilesDownloadProvider>
                <ViewItem />
              </SelectFilesDownloadProvider>
            }
          />
          <Route
            path='/project/:projectId/:itemName/:fileName'
            element={<ViewFile />}
          />
        </Routes>
      </ProjectProvider>
    </React.Fragment>
  );
}

export default App;

import React, { useState } from 'react';

const ProjectContext = React.createContext({});

const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState();
  const [version, setVersion] = useState(
    window.localStorage.getItem('version') !== null
      ? JSON.parse(window.localStorage.getItem('version')).version
      : {}
  );

  return (
    <ProjectContext.Provider
      value={{ project, setProject, version, setVersion }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider, ProjectContext };

import React, { useState } from 'react';

const SelectedFilesContext = React.createContext({});

const SelectedFilesProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <SelectedFilesContext.Provider value={{ selectedFiles, setSelectedFiles }}>
      {children}
    </SelectedFilesContext.Provider>
  );
};

export { SelectedFilesContext, SelectedFilesProvider };

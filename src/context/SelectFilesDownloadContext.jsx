import React, { useState } from 'react';

const SelectFilesDownloadContext = React.createContext({});

const SelectFilesDownloadProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <SelectFilesDownloadContext.Provider
      value={{ selectedFiles, setSelectedFiles }}
    >
      {children}
    </SelectFilesDownloadContext.Provider>
  );
};

export { SelectFilesDownloadContext, SelectFilesDownloadProvider };

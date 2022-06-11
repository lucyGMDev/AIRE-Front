import { useState, useEffect } from 'react';
import { GetFiles } from '../services/FileServices';

const useGetFiles = ({ projectId, itemName, versionName, userToken }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    console.log(versionName);
    GetFiles({ projectId, folderName: itemName, versionName, userToken }).then(
      ({ files }) => setFiles(files)
    );
  }, [projectId, itemName, versionName, userToken]);

  return { files, setFiles };
};

export { useGetFiles };

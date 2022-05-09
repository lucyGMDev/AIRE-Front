import { useState, useEffect } from 'react';
import { GetFiles } from '../services/GetFiles';

const useGetFiles = ({ projectId, itemName, versionName, userToken }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    GetFiles({ projectId, folderName: itemName, versionName, userToken }).then(
      ({ files }) => setFiles(files)
    );
  }, [projectId, itemName, versionName]);

  return { files, setFiles };
};

export { useGetFiles };

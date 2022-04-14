import { useState, useEffect } from 'react';
import { GetFiles } from '../services/GetFiles';

const useGetFiles = ({ projectId, itemName, versionName }) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    GetFiles({ projectId, folderName: itemName, versionName }).then(
      ({ files }) => setFiles(files)
    );
  }, [projectId, itemName, versionName]);

  return { files };
};

export { useGetFiles };

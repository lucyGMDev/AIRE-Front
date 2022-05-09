import { useState, useEffect } from 'react';
import { getFile } from '../services/GetFile';

const useGetFile = ({
  projectId,
  itemName,
  versionName,
  fileName,
  userToken,
}) => {
  const [file, setFile] = useState();
  useEffect(() => {
    getFile({ projectId, itemName, fileName, versionName, userToken }).then(
      (file) => {
        setFile(file);
      }
    );
  }, [projectId, itemName, versionName, fileName, userToken]);

  return { file, setFile };
};

export { useGetFile };

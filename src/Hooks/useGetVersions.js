import { useState, useEffect } from 'react';

import { GetVersions } from '../services/GetVersions';

const useGetVersions = ({ projectId, setVersion, userToken }) => {
  const [versions, setVersions] = useState([]);
  useEffect(() => {
    GetVersions({ projectId, userToken }).then((versionList) => {
      if (
        window.localStorage.getItem('version') === null ||
        parseInt(
          JSON.parse(window.localStorage.getItem('version')).projectId
        ) !== parseInt(projectId)
      ) {
        setVersion(versionList[0]);
        window.localStorage.setItem(
          'version',
          JSON.stringify({
            projectId: projectId,
            version: versionList[0],
          })
        );
      }
      setVersions(versionList);
    });
  }, [projectId]);

  return { versions };
};

export { useGetVersions };

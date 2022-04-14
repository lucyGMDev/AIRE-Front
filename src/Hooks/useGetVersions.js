import { useState, useEffect } from 'react';

import { GetVersions } from '../services/GetVersions';

const useGetVersions = ({ projectId, setVersion }) => {
  const [versions, setVersions] = useState([]);
  useEffect(() => {
    GetVersions({ projectId }).then((versionList) => {
      if (
        window.localStorage.getItem('version') === null ||
        JSON.parse(window.localStorage.getItem('version')).projectId !==
          projectId
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

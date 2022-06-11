import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectProvider';

import { getResourceFromShortUrl } from '../../services/ShortUrlServices';
import { GetVersion } from '../../services/VersionServices';

const ShortUrlHandler = () => {
  const { shortUrl } = useParams();
  const { setVersion } = useContext(ProjectContext);
  const navigate = useNavigate();
  useEffect(() => {
    getResourceFromShortUrl({ shortUrl }).then((resource) => {
      GetVersion({
        projectId: resource.projectId,
        versionName: resource.versionName,
      }).then((version) => {
        setVersion(version);
        window.localStorage.setItem(
          'version',
          JSON.stringify({ projectId: version.projectId, version })
        );
      });
      if (resource.fileName && resource.folderName && resource.projectId) {
        navigate(
          `/project/${resource.projectId}/${resource.folderName}/${resource.fileName}/fileViewer`
        );
      }
      if (
        resource.fileName === undefined &&
        resource.folderName &&
        resource.projectId
      ) {
        navigate(`/project/${resource.projectId}/${resource.folderName}`);
      }
      if (
        resource.fileName === undefined &&
        resource.folderName === undefined &&
        resource.projectId
      ) {
        navigate(`/project/${resource.projectId}`);
      }
    });
  }, [shortUrl]);
  return null;
};

export { ShortUrlHandler };

import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ProjectContext } from '../../context/ProjectProvider';
import { useGetProject } from '../../Hooks/useGetProject';
import { VersionsButton } from '../../components/VersionsButton/VersionsButton';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton';
import { useGetVersions } from '../../Hooks/useGetVersions';
import './ViewFile.css';
const ViewFile = () => {
  const { projectId, itemName, fileName } = useParams();
  const { project, setProject, setVersion } = useContext(ProjectContext);

  const { versions } = useGetVersions({ projectId, setVersion });

  useEffect(() => {
    if (project === null || project === undefined) {
      useGetProject({ projectId }).then((project) => setProject(project));
    }
  }, [projectId]);

  return (
    <main className='file-page'>
      <Header />
      <div>
        <p className='file__path'>
          /
          <Link className='file__path-link' to={`/project/${projectId}`}>
            {project.name}
          </Link>
          /
          <Link
            className='file__path-link'
            to={`/project/${projectId}/${itemName}`}
          >
            {itemName}
          </Link>
          /{fileName}
        </p>
      </div>
      <div className='project__buttons-controller'>
        <VersionsButton versions={versions} projectId={projectId} />
        <DownloadButton
          projectId={projectId}
          folderName={itemName}
          buttonText='Download Folder'
        />
      </div>
    </main>
  );
};

export { ViewFile };

import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ProjectContext } from '../../context/ProjectProvider';
import { useGetProject } from '../../Hooks/useGetProject';
import { VersionsButton } from '../../components/VersionsButton/VersionsButton';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton';

import './ViewItem.css';
import { useGetVersions } from '../../Hooks/useGetVersions';
import { useGetFiles } from '../../Hooks/useGetFiles';
import { FileList } from '../../components/FileList/FileList';
import { SelectFilesDownloadContext } from '../../context/SelectFilesDownloadContext';
const ViewItem = () => {
  const { projectId, itemName } = useParams();
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const { versions } = useGetVersions({ projectId, setVersion });
  const { files } = useGetFiles({
    projectId,
    itemName,
    versionName: version.name,
  });

  const { selectedFiles, setSelectedFiles } = useContext(
    SelectFilesDownloadContext
  );

  useEffect(() => {
    if (project === null || project === undefined) {
      useGetProject({ projectId }).then((project) => setProject(project));
    }
  }, [projectId]);

  useEffect(() => {
    setSelectedFiles([]);
  }, [version]);

  return (
    <React.Fragment>
      {project ? (
        <React.Fragment>
          <Header />
          <main className='item'>
            <div>
              <p className='item__path'>
                /
                <Link className='item__path-link' to={`/project/${projectId}`}>
                  {project.name}
                </Link>
                /{itemName}
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
            <section className='item__files-grid'>
              <FileList files={files} />
            </section>
            <div className='item__download-button'>
              <DownloadButton
                projectId={projectId}
                folderName={itemName}
                buttonText='Download Selected Files'
                selectedFiles={selectedFiles}
              />
            </div>
          </main>
        </React.Fragment>
      ) : (
        'loading'
      )}
    </React.Fragment>
  );
};

export { ViewItem };

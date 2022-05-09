import React, { useContext, useEffect, useState } from 'react';
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
import { SelectedFilesContext } from '../../context/SelectedFilesContext';
import { UserSessionContext } from '../../context/UserSessionContext';
import { FileUploadForm } from '../../components/FileUploadForm/FileUploadForm';
import { DeleteFiles } from '../../services/DeleteFile';
const ViewItem = () => {
  const { projectId, itemName } = useParams();
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const { userToken } = useContext(UserSessionContext);
  const { versions } = useGetVersions({ projectId, setVersion, userToken });
  const { files, setFiles } = useGetFiles({
    projectId,
    itemName,
    versionName: version.name,
    userToken,
  });

  const { selectedFiles, setSelectedFiles } = useContext(SelectedFilesContext);

  const [uploadFile, setUploadFile] = useState(false);

  const deleteFiles = () => {
    selectedFiles.forEach((file) => {
      DeleteFiles({
        projectId,
        folderName: itemName,
        fileName: file,
        userToken,
      }).then((deleted) => {
        if (deleted) {
          setFiles(files.filter((singleFile) => singleFile.fileName !== file));
        }
      });
    });
  };

  useEffect(() => {
    if (project === null || project === undefined) {
      useGetProject({ projectId, userToken }).then((project) =>
        setProject(project)
      );
    }
  }, [projectId]);

  useEffect(() => {
    setSelectedFiles([]);
  }, [version]);

  const addFileToList = (file) => {
    setFiles(
      [...files, file].sort((fileA, fileB) => {
        const nameA = fileA.fileName.toUpperCase();
        const nameB = fileB.fileName.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    );
  };

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

            {uploadFile ? (
              <FileUploadForm
                cancelHandle={() => setUploadFile(false)}
                userToken={userToken}
                projectId={projectId}
                folderName={itemName}
                addFileToList={addFileToList}
              />
            ) : (
              <React.Fragment>
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
                  <div className='item__upload-file'>
                    <span
                      className='item__upload-file-text'
                      onClick={() => setUploadFile(true)}
                    >
                      Upload File
                    </span>
                  </div>
                </section>
                <div className='item__buttons'>
                  <button
                    className='blue-button item__delete-button'
                    onClick={deleteFiles}
                  >
                    Delete Selected Files
                  </button>
                  <DownloadButton
                    projectId={projectId}
                    folderName={itemName}
                    buttonText='Download Selected Files'
                    selectedFiles={selectedFiles}
                  />
                </div>
              </React.Fragment>
            )}
          </main>
        </React.Fragment>
      ) : (
        'loading'
      )}
    </React.Fragment>
  );
};

export { ViewItem };

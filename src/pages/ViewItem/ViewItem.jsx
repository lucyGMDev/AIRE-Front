import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ProjectContext } from '../../context/ProjectProvider';
import { getProject } from '../../Hooks/useGetProject';
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
import { useIsAuthor } from '../../Hooks/useIsAuthor';
import { GetShortUrlButton } from '../../components/GetShortUrlButton/GetShortUrlButton';
import {
  getItem,
  updatePrivacy,
  updateShowHistory,
} from '../../services/ItemServices';
import { UploadFile } from '../../services/UploadFile';
import { LoadSpinner } from '../../components/LoadSpinner/LoadSpinner';
import { DEFAULT_VERSION_NAME } from '../../utils/environmental';
const ViewItem = () => {
  const { projectId, itemName } = useParams();
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const { userToken } = useContext(UserSessionContext);
  const { isAuthor } = useIsAuthor({ projectId, userToken });
  const { versions } = useGetVersions({ projectId, setVersion, userToken });
  const { files, setFiles } = useGetFiles({
    projectId,
    itemName,
    versionName: version.name,
    userToken,
  });
  const { selectedFiles, setSelectedFiles } = useContext(SelectedFilesContext);

  const [uploadFile, setUploadFile] = useState(false);
  const [showHistory, setShowHistory] = useState();
  const [isPublic, setIsPublic] = useState();
  const deleteFiles = async () => {
    setLoading(true);
    let newListFiles = files;
    console.log(newListFiles);
    for (const file of selectedFiles) {
      const deleted = await DeleteFiles({
        projectId,
        folderName: itemName,
        fileName: file,
        userToken,
      });

      if (deleted) {
        newListFiles = newListFiles.filter(
          (singleFile) => singleFile.fileName !== file
        );
        console.log(newListFiles);
      }
    }
    setFiles([...newListFiles]);
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  const [onLastVersion, setOnLastVersion] = useState();

  useEffect(() => {
    if (project === null || project === undefined) {
      getProject({ projectId, userToken }).then((project) =>
        setProject(project)
      );
    }
  }, [projectId]);

  useEffect(() => {
    setSelectedFiles([]);
    if (version.name === DEFAULT_VERSION_NAME) {
      setOnLastVersion(true);
    } else {
      setOnLastVersion(false);
    }
  }, [version]);

  useEffect(() => {
    if (isAuthor) {
      getItem({
        projectId,
        itemName,
        versionName: version.name,
        token: userToken,
      }).then((item) => {
        setShowHistory(item.showHistory);
        setIsPublic(item.isPublic);
      });
    }
  }, [projectId, itemName, version, isAuthor]);

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

  const changeShowHistory = (showHistory) => {
    updateShowHistory({
      projectId,
      itemName,
      showHistory,
      versionName: version.name,
      token: userToken,
    }).then((ok) => {
      if (ok) {
        setShowHistory(showHistory);
      }
    });
  };

  const changePrivacy = (isPublic) => {
    updatePrivacy({
      projectId,
      itemName,
      isPublic,
      versionName: version.name,
      token: userToken,
    }).then((ok) => {
      if (ok) {
        setIsPublic(isPublic);
      }
    });
  };

  const dropHandler = async (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    setLoading(true);
    const filesUploaded = Array.from(evt.dataTransfer.files).filter(
      (file) => !(file.type === '' && file.size === 0)
    );

    const filesAdded = [];
    for (const file of filesUploaded) {
      const fileUpload = {
        isPublic: true,
        description: '',
        showHistory: true,
        file,
      };

      const uploadedFile = await UploadFile({
        fileUpload,
        userToken,
        projectId,
        folderName: itemName,
      });
      filesAdded.push(uploadedFile);
    }

    setFiles(files.concat(filesAdded));
    setLoading(false);
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

            {uploadFile && onLastVersion ? (
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
                  {isAuthor && (
                    <GetShortUrlButton
                      projectId={projectId}
                      itemName={itemName}
                      versionName={version.name}
                    />
                  )}
                  <DownloadButton
                    projectId={projectId}
                    folderName={itemName}
                    buttonText='Download Folder'
                  />
                </div>
                <section className='item__files-grid'>
                  <div className='item__header-files-grid'>
                    <p>Name</p>
                    <p>Number Downloads</p>
                    <p>Last Update</p>
                    <p></p>
                  </div>
                  {files.length === 0 ? (
                    <p className='blue-text item__empty-message'>
                      This item is empty
                    </p>
                  ) : (
                    <FileList files={files} />
                  )}
                  {isAuthor && onLastVersion && (
                    <React.Fragment>
                      <div className='separator'></div>
                      <div
                        className='item__upload-file'
                        onDrop={(evt) => dropHandler(evt)}
                        onDragOver={(evt) => evt.preventDefault()}
                      >
                        <div
                          className='item__upload-block'
                          onClick={() => setUploadFile(true)}
                        >
                          <img
                            className='item__upload-icon'
                            src='/assets/upload-file-icon.webp'
                          />
                          <span className='item__upload-file-text'>
                            Click to upload a file
                          </span>
                          <span className='item__upload-file-text'>
                            Or drag files to upload
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </section>
                <div className='item__buttons'>
                  {isAuthor && (
                    <button
                      className='blue-button item__delete-button'
                      onClick={deleteFiles}
                    >
                      Delete Selected Files
                    </button>
                  )}
                  <DownloadButton
                    projectId={projectId}
                    folderName={itemName}
                    buttonText='Download Selected Files'
                    selectedFiles={selectedFiles}
                  />
                </div>
                {isAuthor && (
                  <section className='setting-item'>
                    <div className='setting-item__configure-block'>
                      <p className='configure-block__title'>Privacy</p>
                      <div className='configure-block__input'>
                        <div>
                          <input
                            type='radio'
                            checked={isPublic}
                            onChange={() => changePrivacy(true)}
                          />
                          Public
                        </div>
                        <div>
                          <input
                            type='radio'
                            checked={!isPublic}
                            onChange={() => changePrivacy(false)}
                          />
                          Private
                        </div>
                      </div>
                    </div>
                    <div className='setting-item__configure-block'>
                      <p className='configure-block__title'>Show History</p>
                      <div className='configure-block__input'>
                        <div>
                          <input
                            type='radio'
                            checked={showHistory}
                            onChange={() => {
                              changeShowHistory(true);
                            }}
                          />
                          Yes
                        </div>
                        <div>
                          <input
                            type='radio'
                            checked={!showHistory}
                            onChange={() => {
                              changeShowHistory(false);
                            }}
                          />
                          No
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </React.Fragment>
            )}
          </main>
          {loading && <LoadSpinner />}
        </React.Fragment>
      ) : (
        <LoadSpinner />
      )}
    </React.Fragment>
  );
};

export { ViewItem };

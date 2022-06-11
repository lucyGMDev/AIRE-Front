import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton';
import { GetShortUrlButton } from '../../components/GetShortUrlButton/GetShortUrlButton';
import { Header } from '../../components/Header/Header';
import { VersionsButton } from '../../components/VersionsButton/VersionsButton';
import { VisorDocumento } from '../../components/VisorDocumento/VisorDocumento';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useGetFile } from '../../Hooks/useGetFile';
import { getProject } from '../../Hooks/useGetProject';
import { useGetVersions } from '../../Hooks/useGetVersions';
import { useIsAuthor } from '../../Hooks/useIsAuthor';
import {
  getFileContent,
  updatePrivacy,
  updateShowHistory,
} from '../../services/FileServices';
import './ViewFile.css';

const ViewFile = () => {
  const { projectId } = useParams('projectId');
  const { itemName } = useParams('itemName');
  const { fileName } = useParams('fileName');
  const [fileContent, setFileContent] = useState();
  const { userToken } = useContext(UserSessionContext);
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const { file } = useGetFile({
    projectId,
    itemName,
    fileName,
    userToken,
    versionName: version.name,
  });
  const { versions } = useGetVersions({ projectId, setVersion, userToken });
  const { isAuthor } = useIsAuthor({ projectId, userToken });
  const [showHistory, setShowHistory] = useState();
  const [isPublic, setIsPublic] = useState();
  useEffect(() => {
    if (project === null || project === undefined) {
      getProject({ projectId, userToken }).then((project) =>
        setProject(project)
      );
    }
  }, [projectId]);
  console.log(file);
  useEffect(() => {
    getFileContent({
      projectId,
      folderName: itemName,
      fileName,
      userToken,
    }).then((fileContent) => {
      setFileContent(fileContent);
    });
  }, [projectId, itemName, fileName, userToken]);

  useEffect(() => {
    console.log(file);
    if (file) {
      setShowHistory(file.showHistorial);
      setIsPublic(file.isPublic);
    }
  }, [file]);
  const changeShowHistory = (showHistory) => {
    updateShowHistory({
      projectId,
      itemName,
      fileName,
      showHistory,
      versionName: version.name,
      token: userToken,
    }).then((ok) => {
      if (ok) {
        setShowHistory(showHistory);
      }
    });
  };

  console.log(file);
  const changePrivacy = (isPublic) => {
    updatePrivacy({
      projectId,
      itemName,
      fileName,
      isPublic,
      versionName: version.name,
      token: userToken,
    }).then((ok) => {
      if (ok) {
        setIsPublic(isPublic);
      }
    });
  };

  return (
    <React.Fragment>
      <Header />
      {project && (
        <main className='file-view'>
          <div>
            <p className='item__path'>
              /
              <Link className='item__path-link' to={`/project/${projectId}`}>
                {project.name}
              </Link>
              /
              <Link
                className='item__path-link'
                to={`/project/${projectId}/${itemName}`}
              >
                {itemName}
              </Link>
              /{fileName}
            </p>
          </div>
          <div className='project__buttons-controller'>
            <VersionsButton versions={versions} projectId={projectId} />
            {isAuthor && (
              <GetShortUrlButton
                projectId={projectId}
                itemName={itemName}
                fileName={fileName}
                versionName={version.name}
              />
            )}
            <DownloadButton
              projectId={projectId}
              folderName={itemName}
              fileName={fileName}
              buttonText='Download File'
            />
          </div>
          <VisorDocumento
            contentFile={fileContent}
            fileName={fileName}
            lastUpdated={file && file.lastUpdatedDate}
            numDownload={file && file.numDownload}
          />
          {file && file.description !== '' && (
            <section className='setting-item'>{file.description}</section>
          )}
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
        </main>
      )}
    </React.Fragment>
  );
};

export { ViewFile };

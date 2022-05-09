import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { VisorDocumento } from '../../components/VisorDocumento/VisorDocumento';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useGetFile } from '../../Hooks/useGetFile';
import { useGetProject } from '../../Hooks/useGetProject';
import { getFileContent } from '../../services/GetFileContent';

const ViewFile = () => {
  const { projectId } = useParams('projectId');
  const { itemName } = useParams('itemName');
  const { fileName } = useParams('fileName');
  const [fileContent, setFileContent] = useState();
  const { userToken } = useContext(UserSessionContext);
  const { file } = useGetFile({ projectId, itemName, fileName, userToken });
  const { project, setProject } = useContext(ProjectContext);
  useEffect(() => {
    if (project === null || project === undefined) {
      useGetProject({ projectId, userToken }).then((project) =>
        setProject(project)
      );
    }
  }, [projectId]);
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
  return (
    <main>
      <Header />
      {project && (
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
      )}
      <VisorDocumento
        contentFile={fileContent}
        fileName={fileName}
        lastUpdated={file && file.lastUpdatedDate}
        numDownload={file && file.numDownload}
      />
      ;
    </main>
  );
};

export { ViewFile };

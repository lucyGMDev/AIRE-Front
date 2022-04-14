import React, { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectProvider';
import { DownloadSource } from '../../services/DownloadSource';
import './DownloadButton.css';
const DownloadButton = ({
  projectId,
  folderName,
  fileName,
  buttonText = 'Download',
  selectedFiles,
}) => {
  const { version, project } = useContext(ProjectContext);
  const handleDownload = () => {
    DownloadSource({
      projectId,
      folderName,
      fileName,
      version: version.name,
      projectName: project.name,
      selectedFiles: selectedFiles,
    });
  };
  return (
    <React.Fragment>
      <button className='download-button' onClick={handleDownload}>
        {buttonText}
      </button>
    </React.Fragment>
  );
};

export { DownloadButton };

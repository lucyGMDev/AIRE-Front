import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getDateSince } from '../../utils/dateUtils';
import { SelectedFilesContext } from '../../context/SelectedFilesContext';
import { ProjectContext } from '../../context/ProjectProvider';
import './File.css';
const File = ({
  projectId,
  directoryName,
  fileName,
  lastUpdate,
  itemName,
  numDownload,
  description,
}) => {
  const date = getDateSince({ dateString: lastUpdate }) || '';
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { selectedFiles, setSelectedFiles } = useContext(SelectedFilesContext);
  const { version } = useContext(ProjectContext);
  const checkbox = useRef();

  const toggleHandle = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  useEffect(() => {
    checkbox.current.checked = false;
    setSelectedFiles(selectedFiles.filter((file) => file !== fileName));
  }, [version]);

  useEffect(() => {
    checkFileHandler();
  }, []);

  const checkFileHandler = () => {
    if (!checkbox.current.checked && selectedFiles.includes(fileName)) {
      setSelectedFiles(selectedFiles.filter((file) => file !== fileName));
    } else if (checkbox.current.checked && !selectedFiles.includes(fileName)) {
      setSelectedFiles([...selectedFiles, fileName]);
    }
  };

  return (
    <article className='file'>
      <div className='file__main-info'>
        <div className='file__name'>
          <input type='checkbox' onChange={checkFileHandler} ref={checkbox} />
          <img
            src={`/assets/${itemName}-item-logo.webp`}
            className='file__logo'
          />
          <Link
            className='link'
            to={`/project/${projectId}/${directoryName}/${fileName}/fileViewer`}
          >
            {fileName}
          </Link>
        </div>
        <p>{numDownload} downloads</p>
        <p>{date}</p>
        <img
          src='/assets/down-arrow.svg'
          className={`file__see-info ${
            showMoreInfo ? 'file__see-info--up' : 'file__see-info--down'
          }${description === '' ? ' hidden ' : ''}`}
          onClick={toggleHandle}
        />
      </div>
      {showMoreInfo && (
        <div className='file-description'>
          <p className='file-description__text'>{description}</p>
        </div>
      )}
    </article>
  );
};

export { File };

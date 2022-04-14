import React from 'react';
import './ProjectItem.css';
import { getDateSince } from '../../utils/dateUtils';
const ProjectItem = ({
  itemName,
  numDownloads,
  lastUpdated,
  isPublic,
  numFiles,
  isEmpty,
}) => {
  const date = getDateSince({ dateString: lastUpdated }) || '';
  return (
    <div
      className={`project-item ${!isPublic ? 'project-item--private' : ''} ${
        isEmpty && 'project-item--empty'
      }`}
    >
      <div className='project-item__header'>
        <img
          className='project-item__logo'
          src={`/assets/${itemName}-item-logo.webp`}
        />
        <span className='project-item__name'>{itemName}</span>
      </div>
      {isPublic ? (
        <div>
          <p>
            <span className='text--main-color'>Number Files: </span> {numFiles}
          </p>
          <p>
            <span className='text--main-color'>Nº Downloads: </span>
            {numDownloads}
          </p>
          <p>
            <span className='text--main-color'>Last Updated: </span> {date}
          </p>
        </div>
      ) : (
        <div className='project-item__block-panel'>
          <img
            className='project-item__block-icon'
            src='/assets/block-icon.webp'
          />
        </div>
      )}
    </div>
  );
};

export { ProjectItem };

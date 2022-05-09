import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectItem.css';
import { UserSessionContext } from '../../context/UserSessionContext';
import { getDateSince } from '../../utils/dateUtils';
import { useIsAuthor } from '../../Hooks/useIsAuthor';
const ProjectItem = ({
  itemName,
  numDownloads,
  lastUpdated,
  isPublic,
  numFiles,
  isEmpty,
}) => {
  const { projectId } = useParams('projectId');
  const { userToken } = useContext(UserSessionContext);
  const { isAuthor } = useIsAuthor({ projectId, userToken });
  const date = getDateSince({ dateString: lastUpdated }) || '';
  return (
    <div
      className={`project-item ${
        !isPublic && !isAuthor ? 'project-item--private' : ''
      } ${isEmpty && 'project-item--empty'}`}
    >
      <div className='project-item__header'>
        <img
          className='project-item__logo'
          src={`/assets/${itemName}-item-logo.webp`}
        />
        <span className='project-item__name'>{itemName}</span>
      </div>
      {isPublic || isAuthor ? (
        <div>
          <p>
            <span className='text--main-color'>Files: </span> {numFiles}
          </p>
          <p>
            <span className='text--main-color'>Downloads: </span>
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

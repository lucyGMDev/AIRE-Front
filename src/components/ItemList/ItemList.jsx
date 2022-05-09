import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectItem } from '../../components/ProjectItem/ProjectItem';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useIsAuthor } from '../../Hooks/useIsAuthor';

import './ItemList.css';
const ItemList = ({ items = [] } = {}) => {
  const { projectId } = useParams('projectId');
  const { userToken } = useContext(UserSessionContext);
  const { isAuthor } = useIsAuthor({ projectId, userToken });
  return (
    <div className='item-list'>
      {items &&
        items.map(
          ({
            folderName,
            numberDownloads,
            lastUpdated,
            isPublic,
            numberFiles,
          }) => {
            return (
              <React.Fragment key={folderName}>
                {(numberFiles > 0 || isAuthor) && (
                  <Link
                    className='object-link '
                    to={`/project/${projectId}/${folderName}`}
                  >
                    <ProjectItem
                      itemName={folderName}
                      numDownloads={numberDownloads}
                      lastUpdated={lastUpdated}
                      isPublic={isPublic}
                      numFiles={numberFiles}
                    />
                  </Link>
                )}
                {numberFiles <= 0 && !isAuthor && (
                  <ProjectItem
                    itemName={folderName}
                    numDownloads={numberDownloads}
                    lastUpdated={lastUpdated}
                    isPublic={isPublic}
                    numFiles={numberFiles}
                    isEmpty
                  />
                )}
              </React.Fragment>
            );
          }
        )}
    </div>
  );
};

export default ItemList;

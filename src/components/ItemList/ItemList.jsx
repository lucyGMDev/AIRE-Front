import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectItem } from '../../components/ProjectItem/ProjectItem';

import './ItemList.css';
const ItemList = ({ items = [] } = {}) => {
  const { projectId } = useParams('projectId');
  return (
    <div className='item-list'>
      {items.map(
        ({
          folderName,
          numberDownloads,
          lastUpdated,
          isPublic,
          numberFiles,
        }) => {
          return (
            <React.Fragment key={folderName}>
              {isPublic && numberFiles > 0 && (
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
              {isPublic && numberFiles <= 0 && (
                <ProjectItem
                  itemName={folderName}
                  numDownloads={numberDownloads}
                  lastUpdated={lastUpdated}
                  isPublic={isPublic}
                  numFiles={numberFiles}
                  isEmpty
                />
              )}
              {!isPublic && (
                <ProjectItem
                  itemName={folderName}
                  numDownloads={numberDownloads}
                  lastUpdated={lastUpdated}
                  isPublic={isPublic}
                  numFiles={numberFiles}
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

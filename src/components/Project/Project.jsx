import React from 'react';
import './Project.css';
const Project = ({ author, projectName, score, lastUpdateDate, isPrivate }) => {
  const projectTitle = author ? `${author}/${projectName}` : projectName;
  const footerPermission = isPrivate
    ? 'project-card__footer--private'
    : 'project-card__footer--public';
  return (
    <article className='project-card'>
      <img className='project-card__icon' src='/assets/folder_icon.webp' />
      <h3 className='project-card__title'>{projectTitle}</h3>
      <span className='project-card__score'>Score: {score}</span>
      <footer className={`project-card__footer ${footerPermission}`}>
        {isPrivate ? (
          <span className='project-card__permision'>Private</span>
        ) : (
          ''
        )}
        <span className='project-card__update-date'>{lastUpdateDate}</span>
      </footer>
    </article>
  );
};

export { Project };

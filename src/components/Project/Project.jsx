import React, { useState, useEffect } from 'react';
import './Project.css';
const Project = ({
  author,
  projectName,
  score,
  lastUpdateDate,
  isPrivate,
  description,
  type = [],
} = {}) => {
  const [showInfo, setShowInfo] = useState(false);

  const [projectCardInfoAction, setProjectCardInfoAction] = useState('');
  useEffect(() => {
    showInfo
      ? setProjectCardInfoAction('project-card__info--apperance')
      : setProjectCardInfoAction('project-card__info--dissapperance');
  }, [showInfo]);

  const projectTitle = author ? `${author}/${projectName}` : projectName;
  const footerPermission = isPrivate
    ? 'project-card__footer--private'
    : 'project-card__footer--public';
  const overHandler = () => {
    setShowInfo(true);
  };
  description =
    description.length > 180
      ? description.substring(0, 180) + '...'
      : description;

  const leaveHandler = () => {
    setShowInfo(false);
  };

  return (
    <article
      className='project-card'
      onMouseOver={overHandler}
      onMouseLeave={leaveHandler}
    >
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
      <div className={`project-card__info ${projectCardInfoAction}`}>
        <p>{description || 'There are not a description'}</p>
        {type ? (
          <p>
            <span className='project-card__categories-title'>Categories:</span>
            {type.join()}
          </p>
        ) : (
          ''
        )}
      </div>
    </article>
  );
};

export { Project };

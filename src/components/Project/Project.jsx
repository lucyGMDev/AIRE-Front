import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ProjectContext } from '../../context/ProjectProvider';
import './Project.css';
const Project = ({
  projectId,
  projectName,
  score,
  lastUpdateDate,
  isPrivate,
  description,
  coauthors,
  type = [],
} = {}) => {
  const [showInfo, setShowInfo] = useState();
  const [projectCardInfoAction, setProjectCardInfoAction] = useState('');
  const { setProject } = useContext(ProjectContext);
  const navigation = useNavigate();
  useEffect(() => {
    if (showInfo === true) {
      setProjectCardInfoAction('project-card__info--apperance');
    }
    if (showInfo === false) {
      setProjectCardInfoAction('project-card__info--dissapperance');
    }
  }, [showInfo]);

  const projectTitle = projectName;
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

  const clickHandler = () => {
    setProject({
      projectId,
      name: projectName,
      score,
      lastUpdateDate,
      isPublic: !isPrivate,
      description,
      type,
      coauthors,
    });
    navigation(`/project/${projectId}`);
  };

  return (
    <article
      className='project-card'
      onMouseOver={overHandler}
      onMouseLeave={leaveHandler}
      onClick={clickHandler}
    >
      <img className='project-card__icon' src='/assets/folder_icon.webp' />
      <h3 className='project-card__title'>{projectTitle}</h3>
      <span className='project-card__score'>
        <Rating initialValue={score} readonly fillColor='#0077b6' />
      </span>
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
        {type.length !== 0 ? <p>{type.join()}</p> : ''}
      </div>
    </article>
  );
};

export { Project };

import React from 'react';
import { Project } from '../Project/Project';
import './ProjectList.css';
const ProjectList = ({
  projects = [],
  addCreateProjectPanel,
  openCreatePanel,
} = {}) => {
  return (
    <section className='project-list'>
      {projects.map((singleProject) => {
        return (
          <Project
            key={singleProject.project_id}
            projectId={singleProject.project_id}
            coauthors={singleProject.coauthors}
            projectName={singleProject.name}
            score={singleProject.avgScore}
            lastUpdateDate={singleProject.lastUpdateName}
            isPrivate={singleProject.isPublic ? null : true}
            description={singleProject.description}
            type={singleProject.type}
          />
        );
      })}
      {addCreateProjectPanel && (
        <article
          className='create-project-card'
          onClick={() => openCreatePanel()}
        >
          <img
            className='create-project-card__add-icon'
            src='/assets/add-icon.webp'
          />
        </article>
      )}
    </section>
  );
};

export { ProjectList };

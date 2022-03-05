import React from 'react';
import { Project } from '../Project/Project';
import './ProjectList.css';
const ProjectList = ({ projects }) => {
  return (
    <section className='project-list'>
      {projects.map((singleProject) => {
        return (
          <Project
            key={singleProject.projectId}
            author={singleProject.author || ''}
            projectName={singleProject.projectName}
            score={singleProject.score}
            lastUpdateDate={singleProject.lastUpdateDate}
            isPrivate={singleProject.isPrivate ? true : null}
          />
        );
      })}
    </section>
  );
};

export { ProjectList };

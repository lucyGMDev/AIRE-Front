import React, { useContext } from 'react';
import { ProjectTag } from '../ProjectTag/ProjectTag';
import { FiltersContext } from '../../context/FiltersContext';
import './ProjectTagList.css';
const ProjectTagList = () => {
  const { typeFilters } = useContext(FiltersContext);

  return (
    <div className='tag-list'>
      {typeFilters.map((singleFilter) => (
        <ProjectTag key={singleFilter} tag={singleFilter} />
      ))}
    </div>
  );
};

export { ProjectTagList };

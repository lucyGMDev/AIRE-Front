import React, { useContext } from 'react';
import './ProjectTag.css';

import { FiltersContext } from '../../context/FiltersContext';

const ProjectTag = ({ tag }) => {
  const { typeFilters, setTypeFilters } = useContext(FiltersContext);

  const handleClick = () => {
    if (typeFilters.includes(tag)) {
      setTypeFilters(typeFilters.filter((filter) => filter !== tag));
    } else {
      setTypeFilters([...typeFilters, tag]);
    }
  };

  return (
    <div className='project-tag' onClick={handleClick}>
      <span className='project-tag__text'>{tag}</span>
      <img
        src='/assets/close-button.svg'
        className='project-tag__remove-icon'
      />
    </div>
  );
};

export { ProjectTag };

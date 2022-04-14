import React, { useState } from 'react';
import { PROJECT_TYPES } from '../../utils/environmental';
import { FilterButton } from './FilterButton';
import './ProjectFilter.css';

const ProjectFilter = () => {
  const [hiddenFilterPanel, setHiddenFilterPanel] = useState(true);

  return (
    <div
      className='project-filter'
      onMouseLeave={() => setHiddenFilterPanel(true)}
    >
      <button
        onClick={() => {
          setHiddenFilterPanel(!hiddenFilterPanel);
        }}
        className='button'
      >
        Filter
        <img className='button__icon' src='/assets/arrow_icon.webp' />
      </button>
      {hiddenFilterPanel ? (
        ''
      ) : (
        <div className='filter-panel'>
          {PROJECT_TYPES.map((singleFilter) => {
            return <FilterButton key={singleFilter} tagName={singleFilter} />;
          })}
        </div>
      )}
    </div>
  );
};

export { ProjectFilter };

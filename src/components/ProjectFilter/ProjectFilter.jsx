import React, { useState } from 'react';
import { FilterTag } from './FilterTag';
import './ProjectFilter.css';
const FILTERS = ['ML', 'NLP', 'SEARCH', 'CV', 'ONT'];
const ProjectFilter = ({ filterList, changeFilters }) => {
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
        <span>Filter</span>
        <img className='button__icon' src='/assets/arrow_icon.webp' />
      </button>
      {hiddenFilterPanel ? (
        ''
      ) : (
        <div className='filter-panel'>
          {FILTERS.map((singleFilter) => {
            return (
              <FilterTag
                key={singleFilter}
                tagName={singleFilter}
                filterList={filterList}
                changeFilters={changeFilters}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export { ProjectFilter };

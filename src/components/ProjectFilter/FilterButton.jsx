import React, { useState, useContext } from 'react';
import { FiltersContext } from '../../context/FiltersContext';
const FilterButton = ({ tagName }) => {
  const { typeFilters, setTypeFilters } = useContext(FiltersContext);
  const [isChecked, setIsChecked] = useState(typeFilters.includes(tagName));

  const clickHandler = () => {
    if (typeFilters.includes(tagName)) {
      setTypeFilters(typeFilters.filter((filter) => filter !== tagName));
      setIsChecked(false);
    } else {
      setTypeFilters([...typeFilters, tagName]);
      setIsChecked(true);
    }
  };
  return (
    <button
      onClick={clickHandler}
      className={`blue-button ${isChecked ? 'blue-button--checked' : ''}`}
    >
      {tagName}
    </button>
  );
};

export { FilterButton };

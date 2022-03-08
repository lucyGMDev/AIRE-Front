import React, { useState } from 'react';

const FilterTag = ({ tagName, filterList, changeFilters }) => {
  const [isChecked, setIsChecked] = useState(filterList.includes(tagName));

  const clickHandler = () => {
    if (filterList.includes(tagName)) {
      changeFilters(filterList.filter((filter) => filter !== tagName));
      setIsChecked(false);
    } else {
      changeFilters([...filterList, tagName]);
      setIsChecked(true);
    }
  };
  return (
    <button
      onClick={clickHandler}
      className={`tag ${isChecked ? 'tag--checked' : ''}`}
    >
      {tagName}
    </button>
  );
};

export { FilterTag };

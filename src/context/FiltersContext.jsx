import React, { useState } from 'react';

const FiltersContext = React.createContext({});

const FiltersProvider = ({ children }) => {
  const [typeFilters, setTypeFilters] = useState([]);
  const [orderFilters, setOrderFilters] = useState('');

  return (
    <FiltersContext.Provider
      value={{ typeFilters, setTypeFilters, orderFilters, setOrderFilters }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersProvider, FiltersContext };

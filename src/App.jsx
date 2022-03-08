import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import { SearchProject } from './pages/SearchProject';

function App() {
  return (
    <Routes>
      <Route path='/search' element={<SearchProject />} />
    </Routes>
  );
}

export default App;

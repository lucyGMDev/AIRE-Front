import React from 'react';
import './App.css';

import { ProjectList } from './components/ProjectList/ProjectList';

const projects = [
  {
    projectId: '1',
    projectName: 'Project 1',
    score: 5,
    lastUpdateDate: '2020-01-01',
    isPrivate: true,
  },
  {
    projectId: '2',
    projectName: 'Project 2',
    author: 'Author 2',
    score: 4,
    lastUpdateDate: '2020-01-02',
  },
  {
    projectId: '3',
    projectName: 'Project 3',
    author: 'Author 3',
    score: 3,
    lastUpdateDate: '2020-01-03',
  },
  {
    projectId: '4',
    projectName: 'Project 1',
    score: 5,
    lastUpdateDate: '2020-01-01',
  },
  {
    projectId: '5',
    projectName: 'Project 2',
    author: 'Author 2',
    score: 4,
    lastUpdateDate: '2020-01-02',
  },
  {
    projectId: '6',
    projectName: 'Project 3',
    author: 'Author 3',
    score: 3,
    lastUpdateDate: '2020-01-03',
  },
];

function App() {
  return (
    <div className='lista'>
      <ProjectList projects={projects} />;
    </div>
  );
}

export default App;

import React from 'react';
import { Coauthor } from '../Coauthor/Coauthor';
import './CoauthorList.css';
const CoauthorList = ({ authors }) => {
  return (
    <div className='coauthor-list'>
      {authors.map((author) => (
        <Coauthor key={author} username={author} />
      ))}
    </div>
  );
};

export { CoauthorList };

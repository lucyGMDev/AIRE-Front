import React from 'react';
import './LoadSpinner.css';
const LoadSpinner = () => {
  return (
    <div className='loadspinner'>
      <p>Loading ...</p>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export { LoadSpinner };

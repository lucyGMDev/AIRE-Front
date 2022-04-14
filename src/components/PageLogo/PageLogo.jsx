import React from 'react';
import { Link } from 'react-router-dom';
import './PageLogo.css';
const PageLogo = () => {
  return (
    <Link className='object-link' to='/'>
      <h1 className='page-logo'>AIRE</h1>
    </Link>
  );
};

export { PageLogo };

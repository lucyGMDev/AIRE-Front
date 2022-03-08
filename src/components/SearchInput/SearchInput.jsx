import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchInput.css';
const SearchInput = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    navigate(`/search${searchInput ? `?keyword=${searchInput}` : ''}`);
    setSearchInput('');
  };
  const handleChange = (evt) => {
    setSearchInput(evt.target.value);
  };
  const clickHandler = () => {
    navigate(`/search?keyword=${searchInput}`);
  };
  return (
    <form className='search-input' onSubmit={handleSubmit}>
      <input
        className='search-input__field'
        type='text'
        onChange={handleChange}
        value={searchInput}
        placeholder='Search projects Key...'
      />
      <img
        onClick={clickHandler}
        className='search-input__submit'
        src='/assets/search_icon.webp'
      />
    </form>
  );
};

export { SearchInput };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchInUserProjects } from '../../services/SearchProjectsServices';
import './SearchInput.css';
const SearchInput = ({
  userToken,
  searchUserProjects,
  username,
  setProjectSearched,
}) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchUserProjects) {
      searchInUserProjects({ userToken, username, keyword: searchInput }).then(
        (projects) => setProjectSearched(projects)
      );
    } else {
      navigate(`/search${searchInput ? `?keyword=${searchInput}` : ''}`);
    }
    setSearchInput('');
  };
  const handleChange = (evt) => {
    setSearchInput(evt.target.value);
  };
  const clickHandler = () => {
    if (searchUserProjects) {
      searchInUserProjects({ userToken, username, keyword: searchInput }).then(
        (projects) => setProjectSearched(projects)
      );
    } else {
      navigate(`/search?keyword=${searchInput}`);
    }
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

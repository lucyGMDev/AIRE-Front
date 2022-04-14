import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import './SearchProject.css';

import { ProjectList } from '../../components/ProjectList/ProjectList';
import {
  searchPublicProject,
  searchProjects,
} from '../../services/SearchProjectsServices';
import { ProjectTagList } from '../../components/ProjectTagList/ProjectTagList';
import { FiltersContext } from '../../context/FiltersContext';
import { Header } from '../../components/Header/Header';
import { UserSessionContext } from '../../context/UserSessionContext';

const SearchProject = () => {
  const { userToken } = useContext(UserSessionContext);
  const [queryParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const { typeFilters, orderFilters } = useContext(FiltersContext);
  const keyword = queryParams.get('keyword') || '';
  useEffect(async () => {
    const projectsList =
      userToken === ''
        ? await searchPublicProject({
            keyword,
            offset: 0,
            numberProjects: 100,
            type: typeFilters,
            order: orderFilters,
          })
        : await searchProjects({
            keyword,
            offset: 0,
            numberProjects: 100,
            type: typeFilters,
            order: orderFilters,
            userToken,
          });
    setProjects(projectsList);
  }, [keyword, typeFilters, orderFilters, userToken]);

  return (
    <React.Fragment>
      <Header addFilters />
      <ProjectTagList />
      <article className='projects-list'>
        {projects.length > 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <h3>Not found</h3>
        )}
      </article>
    </React.Fragment>
  );
};

export { SearchProject };

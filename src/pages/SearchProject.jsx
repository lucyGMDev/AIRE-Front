import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchInput } from '../components/SearchInput/SearchInput';
import { ProjectList } from '../components/ProjectList/ProjectList';
import { searchPublicProject } from '../services/SearchProjectsServices';
import { ProjectFilter } from '../components/ProjectFilter/ProjectFilter';

const SearchProject = () => {
  const [queryParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]); // TODO: extraer en un contexto
  const keyword = queryParams.get('keyword') || '';
  useEffect(async () => {
    const projectsList = await searchPublicProject({
      keyword,
      offset: 0,
      numberProjects: 100,
      type: typeFilters,
      // order: 'RATING',
    });
    setProjects(projectsList);
  }, [keyword, typeFilters]);
  console.log({ SearchProject: typeFilters });
  return (
    <React.Fragment>
      <SearchInput />
      <ProjectFilter filterList={typeFilters} changeFilters={setTypeFilters} />
      {projects.length > 0 ? (
        <ProjectList projects={projects} />
      ) : (
        <h3>Not found</h3>
      )}
    </React.Fragment>
  );
};

export { SearchProject };

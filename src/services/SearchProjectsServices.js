import { BASE_URL } from '../utils/environmental';

const searchPublicProject = async ({
  keyword,
  offset,
  numberProjects,
  type,
  order,
}) => {
  const url = `${BASE_URL}guest/project/search?keyword=${keyword}&offset=${offset}&numberProjects=${numberProjects}${
    type ? `&type=${type}` : ''
  }${order ? `&order=${order}` : ''}`;

  const { projectList } = await fetch(url).then((response) => response.json());
  return projectList;
};

export { searchPublicProject };

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

const searchProjects = async ({
  keyword,
  offset,
  numberProjects,
  type,
  order,
  userToken,
}) => {
  const url = `${BASE_URL}project/search?keyword=${keyword}&offset=${offset}&numberProjectsLoad=${numberProjects}${
    type ? `&type=${type}` : ''
  }${order ? `&order=${order}` : ''}`;
  const header = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, header);
  const { projectList } = await response.json();
  return projectList;
};

const searchInUserProjects = async ({ userToken, username, keyword }) => {
  const url = `${BASE_URL}project/user/${username}/search?keyword=${keyword}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  const { projectList } = await response.json();
  return projectList;
};

export { searchPublicProject, searchProjects, searchInUserProjects };

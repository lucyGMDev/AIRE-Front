import { BASE_URL } from '../utils/environmental';
const useGetProject = async ({ projectId, userToken = '' }) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}`;
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') headers.headers.Authorization = `Bearer ${userToken}`;
  const response = await fetch(url, headers);
  const responseJson = await response.json();
  const project = {
    name: responseJson.name,
    description: responseJson.description,
    score: responseJson.avgScore,
    coauthors: responseJson.coauthors,
    isPublic: responseJson.isPublic,
    type: responseJson.type,
  };
  return project;
};

export { useGetProject };

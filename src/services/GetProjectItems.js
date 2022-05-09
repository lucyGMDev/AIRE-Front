import { BASE_URL } from '../utils/environmental';

const getProjectItems = async ({
  projectId,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/getItems${
    versionName !== '' ? `?version=${versionName}` : ''
  }`;

  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') headers.headers.Authorization = `Bearer ${userToken}`;
  const response = await fetch(url, headers);
  const items = await response.json();
  return items;
};

export { getProjectItems };

import { BASE_URL } from '../utils/environmental';

const getProjectItems = async ({ projectId, versionName = '' }) => {
  const url = `${BASE_URL}guest/project/${projectId}/getItems${
    versionName !== '' ? `?version=${versionName}` : ''
  }`;

  const response = await fetch(url);
  const items = await response.json();
  return items;
};

export { getProjectItems };

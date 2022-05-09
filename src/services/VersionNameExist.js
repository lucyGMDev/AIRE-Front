import { BASE_URL } from '../utils/environmental';

const versionNameExists = async ({ projectId, versionName }) => {
  const url = `${BASE_URL}project/${projectId}/versionExist?versionName=${versionName}`;
  const response = await fetch(url);
  const { exists } = await response.json();
  return exists;
};

export { versionNameExists };

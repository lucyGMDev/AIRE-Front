import { BASE_URL } from '../utils/environmental';

const GetVersions = async ({ token = '', projectId }) => {
  const url = `${BASE_URL}${
    token === '' ? 'guest/' : ''
  }project/${projectId}/getVersions`;

  const response = await fetch(url);
  const { versionList } = await response.json();
  return versionList;
};

export { GetVersions };

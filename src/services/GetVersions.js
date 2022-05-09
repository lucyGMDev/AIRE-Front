import { BASE_URL } from '../utils/environmental';

const GetVersions = async ({ userToken = '', projectId }) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/getVersions`;
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }
  const response = await fetch(url, headers);
  const { versionList } = await response.json();
  return versionList;
};

export { GetVersions };

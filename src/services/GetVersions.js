import { BASE_URL, DEFAULT_VERSION_NAME } from '../utils/environmental';

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

const GetVersion = async ({ projectId, versionName = '' }) => {
  const url = `${BASE_URL}project/${projectId}/getVersionFromName/${
    versionName !== '' ? versionName : `${DEFAULT_VERSION_NAME}`
  }`;
  const response = await fetch(url);
  const version = await response.json();
  return version;
};

export { GetVersions, GetVersion };

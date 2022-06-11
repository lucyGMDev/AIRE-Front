import { BASE_URL, DEFAULT_VERSION_NAME } from '../utils/environmental';

const createVersion = async ({
  projectId,
  userToken,
  versionName,
  isPublic,
}) => {
  const versionData = new FormData();
  versionData.append('name', versionName);
  versionData.append('isPublic', isPublic);
  const url = `${BASE_URL}project/${projectId}/createVersion`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: versionData,
  };

  const response = await fetch(url, headers);
  const version = await response.json();
  return version;
};

const deleteVersion = async ({ projectId, versionName, userToken }) => {
  const url = `${BASE_URL}project/${projectId}/deleteVersion?name=${versionName}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  return response.ok;
};

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

const versionNameExists = async ({ projectId, versionName }) => {
  const url = `${BASE_URL}project/${projectId}/versionExist?versionName=${versionName}`;
  const response = await fetch(url);
  const { exists } = await response.json();
  return exists;
};

export {
  createVersion,
  deleteVersion,
  GetVersions,
  GetVersion,
  versionNameExists,
};

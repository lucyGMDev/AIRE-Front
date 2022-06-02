import { BASE_URL } from '../utils/environmental';

const GetFiles = async ({
  userToken = '',
  projectId,
  folderName,
  versionName = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${folderName}/getFiles${
    versionName !== '' ? `?version=${versionName}` : ''
  }`;
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }
  const response = await fetch(url, headers);
  const files = await response.json();
  return files;
};

export { GetFiles };

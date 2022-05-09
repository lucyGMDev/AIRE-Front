import { BASE_URL } from '../utils/environmental';

const getFile = async ({
  projectId,
  itemName,
  fileName,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${itemName}/file/${fileName}${
    versionName !== '' ? `?versionName=${versionName}` : ''
  }`;
  const headers = {
    method: 'GET',
    headers: {},
  };

  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }

  const response = await fetch(url, headers);
  const file = await response.json();
  return file;
};

export { getFile };

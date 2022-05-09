import { BASE_URL } from '../utils/environmental';

const getFileContent = async ({
  projectId,
  folderName,
  fileName,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${folderName}/file/${fileName}/downloadFile${
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
  const blob = await response.blob();
  const text = await blob.text();

  return text;
};

export { getFileContent };

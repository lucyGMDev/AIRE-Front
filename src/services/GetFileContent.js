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
  }project/${projectId}/folder/${folderName}/file/${fileName}/download${
    versionName !== '' ? `?versionName=${versionName}` : ''
  }`;
  console.log(url);
  console.log('hola');
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }
  const response = await fetch(url, headers);
  const blob = await response.blob();
  const fileNameSplited = fileName.split('.');
  if (fileNameSplited[fileNameSplited.length - 1] === 'pdf') {
    return URL.createObjectURL(blob.slice(0, blob.size, 'application/pdf'));
    // return blob;
  }
  const text = await blob.text();

  return text;
};

export { getFileContent };

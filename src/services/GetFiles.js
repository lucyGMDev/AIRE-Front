import { BASE_URL } from '../utils/environmental';

const GetFiles = ({
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
  const files = fetch(url, headers).then((response) => response.json());

  return files;
};

export { GetFiles };

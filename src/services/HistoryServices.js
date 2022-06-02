import { BASE_URL } from '../utils/environmental';

const getHistorialMessages = async ({
  projectId,
  token = '',
  versionName = '',
}) => {
  const url = `${BASE_URL}${
    token !== '' ? '' : 'guest/'
  }project/${projectId}/getHistorial?versionName=${versionName}`;
  const headers = {
    method: 'GET',
  };

  if (token !== '') {
    headers.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, headers);
  const history = await response.json();
  return history;
};

export { getHistorialMessages };

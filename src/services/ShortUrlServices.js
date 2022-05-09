import { BASE_URL } from '../utils/environmental';

const createProjectShortUrl = async ({
  projectId,
  versionName = '',
  shortUrl = '',
  userToken,
}) => {
  const url = `${BASE_URL}project/${projectId}/getShortUrl?${
    versionName !== '' && `versionName=${versionName}&`
  }${shortUrl !== '' && `shortUrl=${shortUrl}&`}`;

  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(url, headers);
  const { shorUrl } = await response.json();
  return shorUrl;
};

const getShortUrl = async ({ projectId, versionName = '', userToken }) => {
  const url = `${BASE_URL}project/${projectId}/getShortUrl?${
    versionName !== '' && `versionName=${versionName}&`
  }`;

  const headers = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(url, headers);
  const { shorUrl } = await response.json();
  return shorUrl;
};

export { createProjectShortUrl, getShortUrl };

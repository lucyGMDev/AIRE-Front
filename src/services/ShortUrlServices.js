import { BASE_URL } from '../utils/environmental';

const createProjectShortUrl = async ({
  projectId,
  itemName = '',
  fileName = '',
  versionName = '',
  shortUrl = '',
  userToken,
}) => {
  const url = `${BASE_URL}project/${projectId}/getShortUrl?${
    itemName !== '' ? `folderName=${itemName}&` : ''
  }${fileName !== '' ? `fileName=${fileName}&` : ''}${
    versionName !== '' ? `versionName=${versionName}&` : ''
  }${shortUrl !== '' ? `shortUrl=${shortUrl}&` : ''}`;

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

const getShortUrl = async ({
  projectId,
  itemName = '',
  fileName = '',
  versionName = '',
  userToken,
}) => {
  const url = `${BASE_URL}project/${projectId}/getShortUrl?${
    itemName !== '' ? `folderName=${itemName}&` : ''
  }${fileName !== '' ? `fileName=${fileName}&` : ''}${
    versionName !== '' ? `versionName=${versionName}&` : ''
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

const getResourceFromShortUrl = async ({ shortUrl }) => {
  const url = `${BASE_URL}project/shortUrl/${shortUrl}`;
  const response = await fetch(url);
  const resource = await response.json();
  return resource;
};

export { createProjectShortUrl, getShortUrl, getResourceFromShortUrl };

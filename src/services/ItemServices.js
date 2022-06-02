import { BASE_URL } from '../utils/environmental';

const getItem = async ({
  projectId,
  itemName,
  versionName = '',
  token = '',
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}?version=${versionName}`;
  const headers = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  const item = await response.json();
  return item;
};

const updateShowHistory = async ({
  projectId,
  itemName,
  showHistory,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/${showHistory}/changeShowHistory?version=${versionName}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

const updatePrivacy = async ({
  projectId,
  itemName,
  isPublic,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/${isPublic}?version=${versionName}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

export { getItem, updateShowHistory, updatePrivacy };

import { BASE_URL } from '../utils/environmental';

const updateShowHistory = async ({
  projectId,
  itemName,
  fileName,
  showHistory,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/file/${fileName}/changeShowHistory/${showHistory}?version=${versionName}`;
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
  fileName,
  isPublic,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/file/${fileName}/changeVisibility/${isPublic}?version=${versionName}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

export { updateShowHistory, updatePrivacy };

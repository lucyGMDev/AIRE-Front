import { BASE_URL } from '../utils/environmental';

const deleteVersion = async ({ projectId, versionName, userToken }) => {
  const url = `${BASE_URL}project/${projectId}/deleteVersion?name=${versionName}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  return response.ok;
};

export { deleteVersion };

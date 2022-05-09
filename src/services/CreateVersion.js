import { BASE_URL } from '../utils/environmental';

const createVersion = async ({
  projectId,
  userToken,
  versionName,
  isPublic,
}) => {
  const versionData = new FormData();
  versionData.append('name', versionName);
  versionData.append('isPublic', isPublic);
  const url = `${BASE_URL}project/${projectId}/createVersion`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: versionData,
  };

  const response = await fetch(url, headers);
  const version = await response.json();
  return version;
};

export { createVersion };

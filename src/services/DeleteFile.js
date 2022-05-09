import { BASE_URL } from '../utils/environmental';

const DeleteFiles = async ({ projectId, folderName, fileName, userToken }) => {
  const url = `${BASE_URL}project/${projectId}/folder/${folderName}/file/${fileName}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  return response.ok;
};

export { DeleteFiles };

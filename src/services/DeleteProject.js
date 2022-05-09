import { BASE_URL } from '../utils/environmental';

const deleteProject = async ({ projectId, userToken }) => {
  const url = `${BASE_URL}project/${projectId}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  return response.ok;
};

export { deleteProject };

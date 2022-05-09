import { BASE_URL } from '../utils/environmental';

const updateProject = async ({ projectId, updatedProject, userToken }) => {
  const url = `${BASE_URL}project/${projectId}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProject),
  };
  const response = await fetch(url, headers);
  const project = await response.json();
  return project;
};

export { updateProject };

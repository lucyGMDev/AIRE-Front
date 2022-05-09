import { BASE_URL } from '../utils/environmental';

const CreateProject = async ({ project, userToken }) => {
  const url = `${BASE_URL}project`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  };

  const response = await fetch(url, headers);
  const projectCreated = await response.json();
  return projectCreated;
};

export { CreateProject };

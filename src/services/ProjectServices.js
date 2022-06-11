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

const getProjectItems = async ({
  projectId,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/getItems${
    versionName !== '' ? `?version=${versionName}` : ''
  }`;

  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') headers.headers.Authorization = `Bearer ${userToken}`;
  const response = await fetch(url, headers);
  const items = await response.json();
  return items;
};

const RateProject = ({ rating, userToken, projectId }) => {
  const url = `${BASE_URL}project/${projectId}/rateProject?score=${rating}`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  fetch(url, headers);
};

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

export {
  CreateProject,
  deleteProject,
  getProjectItems,
  RateProject,
  updateProject,
};

import { BASE_URL } from '../utils/environmental';
const useGetProject = async ({ projectId }) => {
  const response = await fetch(`${BASE_URL}guest/project/${projectId}`);
  const responseJson = await response.json();
  const project = {
    name: responseJson.name,
    description: responseJson.description,
    score: responseJson.avgScore,
    coauthors: responseJson.coauthors,
  };
  return project;
};

export { useGetProject };

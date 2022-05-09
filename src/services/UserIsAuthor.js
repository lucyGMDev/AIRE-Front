import { BASE_URL } from '../utils/environmental';

const UserIsAuthor = async ({ userToken, projectId }) => {
  const url = `${BASE_URL}project/${projectId}/isAuthor`;
  const headers = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(url, headers);
  const isAuthor = response.json();
  return isAuthor;
};

export { UserIsAuthor };

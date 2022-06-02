import { BASE_URL } from '../utils/environmental';

const deleteComment = async ({ projectId, commentId, userToken }) => {
  const url = `${BASE_URL}comment/deleteComment/${projectId}/${commentId}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

export { deleteComment };

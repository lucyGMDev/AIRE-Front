import { BASE_URL } from '../utils/environmental';
const PostAComment = async ({
  projectId,
  username,
  commentText,
  responseCommentId,
  userToken,
}) => {
  const bodyParams = {
    projectId,
    username,
    commentText,
    responseCommentId,
  };
  const url = `${BASE_URL}comment/postComment`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(bodyParams),
  };

  const response = await fetch(url, headers);
  const comment = await response.json();
  return { comment };
};

export { PostAComment };

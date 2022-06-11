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

const getComments = async ({
  projectId,
  userToken = '',
  offset = 0,
  numberCommentsLoad,
}) => {
  const url = `${BASE_URL}comment/${projectId}/getComments?offset=${offset}&numberCommentsLoad=${numberCommentsLoad}`;
  const header = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') header.headers.Authorization = `Bearer ${userToken}`;
  const response = await fetch(url, header);
  const { comments } = await response.json();
  return comments;
};

const getCommentResponses = async ({
  projectId,
  userToken = '',
  offset = 0,
  numberCommentsLoad,
  commentResponseId,
}) => {
  const url = `${BASE_URL}comment/${projectId}/getResponses/${commentResponseId}?offset=${offset}&numberCommentsLoad=${numberCommentsLoad}`;
  const header = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') header.headers.Authorization = `Bearer ${userToken}`;
  const response = await fetch(url, header);
  const { comments } = await response.json();
  return comments;
};

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

export { deleteComment, getComments, getCommentResponses, PostAComment };

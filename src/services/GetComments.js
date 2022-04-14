import { BASE_URL } from '../utils/environmental';

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

export { getComments, getCommentResponses };

import { BASE_URL } from '../utils/environmental';

const GetUserByUsername = async ({ username }) => {
  const url = `${BASE_URL}user/${username}`;
  const response = await fetch(url);
  const user = await response.json();
  return user;
};

const UserExists = async ({ username }) => {
  const url = `${BASE_URL}user/${username}/userExists`;
  const response = await fetch(url);
  if (response.ok) return true;
  return false;
};

const UserExistsEmail = async ({ userEmail }) => {
  const url = `${BASE_URL}user/${userEmail}/userExistsEmail`;
  const response = await fetch(url);
  const { exists } = await response.json();
  return exists;
};

const UpdateUser = async ({
  userEmail,
  userFirstName = '',
  userLastName = '',
  userPicture,
  userToken,
}) => {
  const formData = new FormData();
  formData.append('name', userFirstName);
  formData.append('lastName', userLastName);
  if (userPicture !== undefined) formData.append('picture', userPicture);
  const url = `${BASE_URL}user/${userEmail}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: formData,
  };
  const response = await fetch(url, headers);
  const user = response.json();
  return user;
};

const UserIsAuthor = async ({ userToken, projectId }) => {
  if (userToken === '') return false;
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

export {
  GetUserByUsername,
  UserExists,
  UserExistsEmail,
  UpdateUser,
  UserIsAuthor,
};

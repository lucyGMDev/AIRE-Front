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

export { GetUserByUsername, UserExists, UserExistsEmail };

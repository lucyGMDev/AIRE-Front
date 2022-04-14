import { BASE_URL } from '../utils/environmental';

const GetUserByEmail = async ({ userEmail }) => {
  const url = `${BASE_URL}user/${userEmail}`;
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

export { GetUserByEmail, UserExists };

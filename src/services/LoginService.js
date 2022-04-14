import { BASE_URL } from '../utils/environmental';
const Login = async ({ oauthToken }) => {
  const url = `${BASE_URL}create_user_sesion`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${oauthToken}`,
    },
  };
  const response = await fetch(url, headers);
  const { token, user } = await response.json();
  return { token, user };
};

export { Login };

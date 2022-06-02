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

const SignUp = async ({ oauthToken, username }) => {
  const url = `${BASE_URL}signup`;
  const data = new FormData();
  data.append('username', username);
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${oauthToken}`,
    },
    body: data,
  };
  console.log(headers);
  const response = await fetch(url, headers);
  const { token, user } = await response.json();
  return { token, user };
};

export { Login, SignUp };

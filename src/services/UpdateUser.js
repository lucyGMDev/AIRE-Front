import { BASE_URL } from '../utils/environmental';

const UpdateUser = async ({
  userEmail,
  userFirstName,
  userLastName,
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

export { UpdateUser };

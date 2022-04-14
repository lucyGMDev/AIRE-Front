import { BASE_URL } from '../utils/environmental';

const RateProject = ({ rating, userToken, projectId }) => {
  const url = `${BASE_URL}project/${projectId}/rateProject?score=${rating}`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  fetch(url, headers);
};

export { RateProject };

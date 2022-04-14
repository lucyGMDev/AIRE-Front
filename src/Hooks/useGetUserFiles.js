import { useState, useEffect } from 'react';
import { BASE_URL } from '../utils/environmental';
const useGetUserFiles = ({ userGetProjects, userToken }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    let headers;
    if (userToken) {
      headers = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
    } else {
      headers = {
        method: 'GET',
      };
    }
    const url = `${BASE_URL}project/user/${userGetProjects}`;
    fetch(url, headers)
      .then((response) => {
        return response.json();
      })
      .then((projects) => {
        setProjects(projects.projectList);
      });
  }, [userGetProjects, userToken]);

  return { projects, setProjects };
};

export { useGetUserFiles };

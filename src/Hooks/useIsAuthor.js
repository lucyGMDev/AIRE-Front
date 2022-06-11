import { useState, useEffect } from 'react';
import { UserIsAuthor } from '../services/UserServices';

const useIsAuthor = ({ projectId, userToken = '' }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    UserIsAuthor({ userToken, projectId }).then((owner) => setIsAuthor(owner));
  }, [userToken, projectId]);
  return { isAuthor };
};

export { useIsAuthor };

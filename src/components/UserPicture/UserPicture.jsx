import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/environmental';
import './UserPicture.css';

const UserPicture = ({ picture, pictureUrl, big }) => {
  const [picturePath, setPicturePath] = useState();
  useEffect(() => {
    if (picture) {
      setPicturePath(picture);
    } else if (pictureUrl) {
      setPicturePath(`${BASE_URL}${pictureUrl}`);
    } else {
      setPicturePath('/assets/user-default-picture.webp');
    }
  }, [picture, pictureUrl]);
  return (
    <img className={`picture ${big && 'picture--big'}`} src={picturePath} />
  );
};

export { UserPicture };

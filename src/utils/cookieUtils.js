const addCookie = ({ key, value, expirationTime }) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expirationTime);
  document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()}`;
};

const getCookieValue = ({ key }) => {
  if (!cookieExists({ key })) return undefined;
  const cookieValue = document.cookie
    .split(';')
    .map((row) => row.trim())
    .find((row) => row.startsWith(`${key}=`))
    .split('=')[1];
  return cookieValue;
};

const cookieExists = ({ key }) => {
  return (
    document.cookie
      .split(';')
      .map((row) => row.trim())
      .find((row) => row.startsWith(`${key}=`)) !== undefined
  );
};

export { addCookie, getCookieValue, cookieExists };

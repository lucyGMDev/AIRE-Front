const addCookie = ({ key, value, expirationTime }) => {
  if (value === undefined) return;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + expirationTime);
  document.cookie = `${key}=${value};expires=${expirationDate.toUTCString()};path=/`;
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

const eliminarCookie = ({ key }) => {
  console.log(key);
  if (cookieExists({ key })) {
    console.log('Hello');
    document.cookie = `${key}=;max-age=0`;
  }
};

export { addCookie, getCookieValue, cookieExists, eliminarCookie };

import { BASE_URL } from '../utils/environmental';

const updateShowHistory = async ({
  projectId,
  itemName,
  fileName,
  showHistory,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/file/${fileName}/changeShowHistory/${showHistory}?version=${versionName}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

const updatePrivacy = async ({
  projectId,
  itemName,
  fileName,
  isPublic,
  versionName = '',
  token,
}) => {
  const url = `${BASE_URL}project/${projectId}/folder/${itemName}/file/${fileName}/changeVisibility/${isPublic}?version=${versionName}`;
  const headers = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, headers);
  return response.ok;
};

const DeleteFiles = async ({ projectId, folderName, fileName, userToken }) => {
  const url = `${BASE_URL}project/${projectId}/folder/${folderName}/file/${fileName}`;
  const headers = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await fetch(url, headers);
  return response.ok;
};

const getFile = async ({
  projectId,
  itemName,
  fileName,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${itemName}/file/${fileName}${
    versionName !== '' ? `?versionName=${versionName}` : ''
  }`;
  const headers = {
    method: 'GET',
    headers: {},
  };

  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }

  const response = await fetch(url, headers);
  const file = await response.json();
  return file;
};

const getFileContent = async ({
  projectId,
  folderName,
  fileName,
  versionName = '',
  userToken = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${folderName}/file/${fileName}/download${
    versionName !== '' ? `?versionName=${versionName}` : ''
  }`;
  console.log(url);
  console.log('hola');
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }
  const response = await fetch(url, headers);
  const blob = await response.blob();
  const fileNameSplited = fileName.split('.');
  if (fileNameSplited[fileNameSplited.length - 1] === 'pdf') {
    return URL.createObjectURL(blob.slice(0, blob.size, 'application/pdf'));
    // return blob;
  }
  const text = await blob.text();

  return text;
};

const GetFiles = async ({
  userToken = '',
  projectId,
  folderName,
  versionName = '',
}) => {
  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/folder/${folderName}/getFiles${
    versionName !== '' ? `?version=${versionName}` : ''
  }`;
  const headers = {
    method: 'GET',
    headers: {},
  };
  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }
  const response = await fetch(url, headers);
  const files = await response.json();
  return files;
};

const UploadFile = async ({ fileUpload, userToken, projectId, folderName }) => {
  if (fileUpload.file === undefined) return;
  const formData = new FormData();
  formData.append('description', fileUpload.description);
  formData.append('isPublic', fileUpload.isPublic);
  formData.append('showHistory', fileUpload.showHistory);
  formData.append('file', fileUpload.file);
  const url = `${BASE_URL}project/${projectId}/folder/${folderName}/addFile`;
  const headers = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: formData,
  };
  const response = await fetch(url, headers);
  const file = response.json();
  return file;
};
export {
  updateShowHistory,
  updatePrivacy,
  DeleteFiles,
  getFile,
  getFileContent,
  GetFiles,
  UploadFile,
};

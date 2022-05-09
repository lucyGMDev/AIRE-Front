import { BASE_URL } from '../utils/environmental';

const UploadFile = async ({ fileUpload, userToken, projectId, folderName }) => {
  if (fileUpload.file === undefined) return;
  const formData = new FormData();
  formData.append('description', fileUpload.description);
  formData.append('isPublic', fileUpload.isPublic);
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

export { UploadFile };

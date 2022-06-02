import { BASE_URL } from '../utils/environmental';

const DownloadSource = async ({
  projectName,
  projectId,
  folderName,
  fileName,
  userToken = '',
  version = '',
  selectedFiles,
}) => {
  if (projectId === undefined) throw Error('Project Id is required');
  if (folderName === undefined && fileName !== undefined)
    throw Error('Folder name is required to download a file');
  let headers;

  if (selectedFiles !== null && selectedFiles !== undefined) {
    if (selectedFiles.length === 0) {
      return;
    }
    headers = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFiles),
    };
  } else {
    headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    };
  }

  if (userToken !== '') {
    headers.headers.Authorization = `Bearer ${userToken}`;
  }

  const url = `${BASE_URL}${
    userToken === '' ? 'guest/' : ''
  }project/${projectId}/${
    folderName !== undefined ? `folder/${folderName}/` : ''
  }${fileName !== undefined ? `file/${fileName}/` : ''}${
    selectedFiles !== null && selectedFiles !== undefined
      ? 'downloadSelected'
      : 'download'
  }${version !== '' ? `?version=${version}` : ''}`;
  console.log(url);
  let downloadedFileName;
  if (fileName) {
    downloadedFileName = fileName;
  } else if (folderName) {
    downloadedFileName = folderName + '.zip';
  } else {
    downloadedFileName = projectName + '.zip';
  }

  fetch(url, headers)
    .then((response) => response.blob())
    .then((blob) => {
      const urlDownload = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.setAttribute('href', urlDownload);
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('download', downloadedFileName);
      anchor.click();
    });
};

export { DownloadSource };

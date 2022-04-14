import React from 'react';
import { File } from '../File/File';
const FileList = ({ files }) => {
  return files.map(
    ({
      fileName,
      lastUpdatedDate,
      directoryName,
      description,
      numDownload,
      projectId,
    }) => (
      <File
        projectId={projectId}
        directoryName={directoryName}
        key={fileName}
        fileName={fileName}
        lastUpdate={lastUpdatedDate}
        itemName={directoryName}
        description={description}
        numDownload={numDownload}
      />
    )
  );
};

export { FileList };

import React, { useEffect, useState } from 'react';
import './VisorDocumento.css';
const VisorDocumento = ({
  contentFile,
  fileName,
  lastUpdated,
  numDownload,
}) => {
  const [isPdf, setIsPdf] = useState();
  useEffect(() => {
    const fileNameSplited = fileName.split('.');
    if (contentFile && fileNameSplited[fileNameSplited.length - 1] === 'pdf') {
      setIsPdf(true);
    } else {
      setIsPdf(false);
    }
  }, [contentFile, fileName]);
  return (
    <section className='visor-documentos'>
      <div className='visor-documentos__header'>
        <span>{fileName}</span>
        <span>{numDownload} Downloads</span>
        <span>Last Updated {lastUpdated}</span>
      </div>
      {contentFile && !isPdf && (
        <div className='visor-documentos__content'>
          {contentFile
            .trim()
            .split('\n')
            .map((line, numberLine) => {
              return (
                <p key={numberLine + 1}>
                  <span className='visor-documentos__numberLine'>
                    {numberLine + 1}
                  </span>
                  {line}
                </p>
              );
            })}
        </div>
      )}
      {contentFile && isPdf && (
        <iframe
          className='visor-documentos__content visor-documentos__content--pdf'
          width='100%'
          height='100%'
          type='application/pdf'
          src={contentFile}
        ></iframe>
      )}
    </section>
  );
};

export { VisorDocumento };

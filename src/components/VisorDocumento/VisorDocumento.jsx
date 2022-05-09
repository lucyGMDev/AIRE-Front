import React, { useRef, useEffect } from 'react';
import './VisorDocumento.css';
const VisorDocumento = ({
  contentFile,
  fileName,
  lastUpdated,
  numDownload,
}) => {
  const contentRef = useRef();
  const contentRefPdf = useRef();
  useEffect(() => {
    contentRef.current.innerText = contentFile;
    console.log(contentRef);
    // console.log(contentRefPdf);
    // contentRefPdf.current.data = contentFile;
  }, [contentFile]);
  return (
    <section className='visor-documentos'>
      <div className='visor-documentos__header'>
        <span>{fileName}</span>
        <span>{numDownload} Downloads</span>
        <span>Last Updated {lastUpdated}</span>
      </div>
      <div className='visor-documentos__content'>
        <span ref={contentRef}></span>
      </div>
      {/* <object
        className='visor-documentos__content'
        type='application/pdf'
        ref={contentRefPdf}
      ></object> */}
    </section>
  );
};

export { VisorDocumento };

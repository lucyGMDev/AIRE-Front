import React, { useState, useContext } from 'react';
import { ProjectContext } from '../../context/ProjectProvider';
import './VersionsButton.css';
const VersionsButton = ({ projectId, versions }) => {
  const [showPannel, setShowPannel] = useState(false);
  const { version, setVersion } = useContext(ProjectContext);
  const clickHander = () => {
    setShowPannel(!showPannel);
  };

  const changeVersion = (version) => {
    setVersion(version);
    window.localStorage.setItem(
      'version',
      JSON.stringify({ projectId, version })
    );
    setShowPannel(false);
  };

  const versionName = version ? version.name : 'Versions';

  return (
    <div className='version'>
      <button className='versions-button' onClick={clickHander}>
        <img
          src='/assets/version_icon.webp'
          className='versions-button__icon versions-button__icon--version'
        />
        {versionName}
        <img
          src='/assets/arrow_icon.webp'
          className='versions-button__icon versions-button__icon--arrow'
        />
      </button>
      {showPannel ? (
        <div className='versions-pannel'>
          {versions.map((version) => {
            return (
              <p
                className='versions-pannel__link '
                onClick={() => changeVersion(version)}
                key={version.name}
              >
                {version.name}
              </p>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export { VersionsButton };

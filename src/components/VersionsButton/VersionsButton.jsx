import React, { useState, useContext } from 'react';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { deleteVersion } from '../../services/VersionServices';
import { DEFAULT_VERSION_NAME } from '../../utils/environmental';
import './VersionsButton.css';
const VersionsButton = ({ projectId, versions, setVersions }) => {
  const [showPannel, setShowPannel] = useState(false);
  const { version, setVersion } = useContext(ProjectContext);
  const { userToken } = useContext(UserSessionContext);
  const clickHander = () => {
    setShowPannel(!showPannel);
  };

  const changeVersion = (version) => {
    console.log(version);
    setVersion(version);
    window.localStorage.setItem(
      'version',
      JSON.stringify({ projectId, version })
    );
    setShowPannel(false);
  };
  const deleteVersionHandle = ({ version }) => {
    deleteVersion({ projectId, versionName: version.name, userToken }).then(
      (isDeleted) => {
        if (isDeleted) {
          changeVersion(
            versions.find((version) => version.name === DEFAULT_VERSION_NAME)
          );
          setVersions(
            versions.filter(
              (singleVersion) => singleVersion.name !== version.name
            )
          );
        }
      }
    );
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
              <div key={version.name} className='versions-pannel__version'>
                <span
                  className='versions-pannel__link '
                  onClick={() => changeVersion(version)}
                >
                  {version.name}
                </span>
                {version.name !== DEFAULT_VERSION_NAME && (
                  <img
                    className='versions-pannel__close-button'
                    src='/assets/close-button.svg'
                    onClick={() => deleteVersionHandle({ version })}
                  />
                )}
              </div>
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

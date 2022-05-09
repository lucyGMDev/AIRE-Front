import React, { useState, useContext, useRef } from 'react';
import { DEFAULT_VERSION_NAME } from '../../utils/environmental';
import { UserSessionContext } from '../../context/UserSessionContext';
import { createVersion } from '../../services/CreateVersion';
import { versionNameExists } from '../../services/VersionNameExist';
import './CreateVersionButton.css';

const CreateVersionButton = ({ projectId, addNewVersion }) => {
  const [displayCreateVersion, setDisplayCreateVersion] = useState(false);
  const [versionName, setVersionName] = useState('');
  const [versionNameError, setVersionNameError] = useState('');
  const [newVersionIsPublic, setNewVersionIsPublic] = useState(true);
  const { userToken } = useContext(UserSessionContext);
  const inputNameRef = useRef();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (versionName === DEFAULT_VERSION_NAME) {
      setVersionNameError(
        `The name ${DEFAULT_VERSION_NAME} is invalid. This name is reserved for the current version of the project`
      );
      setVersionName('');
      inputNameRef.current.blur();
      return;
    }
    const exists = await versionNameExists({ projectId, versionName });
    if (exists) {
      setVersionName('');
      setVersionNameError(
        'There are another version with the same name on this project'
      );
      inputNameRef.current.blur();
      return;
    }
    createVersion({
      userToken,
      projectId,
      versionName,
      isPublic: newVersionIsPublic,
    }).then((versionAdded) => {
      addNewVersion(versionAdded);
      setVersionName('');
      setDisplayCreateVersion(false);
    });
  };

  const createVersionButtonHandle = () => {
    if (displayCreateVersion) {
      setVersionName('');
    }
    setDisplayCreateVersion(!displayCreateVersion);
  };

  return (
    <article className='create-version'>
      <button
        className='blue-button project-setting__button'
        onClick={createVersionButtonHandle}
      >
        Create Version
      </button>
      {displayCreateVersion && (
        <form className='create-version-panel' onSubmit={handleSubmit}>
          <label className='create-version-panel__label'>Version Name</label>
          <input
            className='form__input create-version-panel__input'
            type='text'
            placeholder='Introduce a name for the version...'
            ref={inputNameRef}
            value={versionName}
            onChange={(evt) => setVersionName(evt.target.value)}
            onFocus={() => setVersionNameError('')}
          />
          {versionNameError !== '' && (
            <p className='create-version-panel__error-message'>
              {versionNameError}
            </p>
          )}
          <label className='create-version-panel__label'>Privacy</label>
          <p>
            <input
              className='create-version-panel__input-radio'
              type='radio'
              checked={newVersionIsPublic}
              onChange={() => setNewVersionIsPublic(true)}
            />
            Public
          </p>
          <p>
            <input
              className='create-version-panel__input-radio'
              type='radio'
              checked={!newVersionIsPublic}
              onChange={() => setNewVersionIsPublic(false)}
            />
            Private
          </p>
          <input type='submit' value='Create Version' className='blue-button' />
        </form>
      )}
    </article>
  );
};

export { CreateVersionButton };

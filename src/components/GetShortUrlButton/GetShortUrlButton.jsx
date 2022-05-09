import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserSessionContext } from '../../context/UserSessionContext';
import {
  createProjectShortUrl,
  getShortUrl,
} from '../../services/ShortUrlServices';
import './GetShortUrlButton.css';
const GetShortUrlButton = ({ projectId, versionName }) => {
  const [displayShortUrlPanel, setDisplayShortUrlPanel] = useState(false);
  const [inputShortUrl, setInputShortUrl] = useState('');
  const [inputShortUrlError, setInputShortUrlError] = useState('');
  const { userToken } = useContext(UserSessionContext);
  const [shortUrl, setShortUrl] = useState('');
  const shortUrlInput = useRef();
  const createShortUrl = (evt) => {
    evt.preventDefault();
    if (inputShortUrl === '') {
      shortUrlInput.current.blur();
      setInputShortUrlError(
        'Short url is required to create a custom short url'
      );
      return;
    }
    createProjectShortUrl({
      projectId,
      versionName,
      shortUrl: inputShortUrl,
      userToken,
    }).then((shortUrl) => {
      setShortUrl(shortUrl);
    });
  };

  const createRandomUrl = () => {
    createProjectShortUrl({
      projectId,
      versionName,
      userToken,
    }).then((shortUrl) => {
      setShortUrl(shortUrl);
    });
  };

  useEffect(() => {
    getShortUrl({ projectId, userToken, versionName }).then((shorUrl) =>
      setShortUrl(shorUrl)
    );
  }, [projectId, versionName]);

  return (
    <div className='short-url'>
      <button
        onClick={() => setDisplayShortUrlPanel(!displayShortUrlPanel)}
        className='blue-button get-short-url-button'
      >
        Get Short Url
      </button>
      {displayShortUrlPanel && shortUrl === '' && (
        <div className='short-url-panel'>
          <form onSubmit={createShortUrl}>
            <label
              htmlFor='short-url-input'
              className='create-short-url__label'
            >
              Create Short Url
            </label>
            <input
              ref={shortUrlInput}
              type='text'
              name='short-url-input'
              value={inputShortUrl}
              className='form__input create-short-url__input'
              placeholder='Create your short url'
              onFocus={() => {
                setInputShortUrlError('');
              }}
              onChange={(evt) => {
                setInputShortUrl(evt.target.value);
              }}
            />
            {inputShortUrlError !== '' && (
              <p className='create-short-url__error-message'>
                {inputShortUrlError}
              </p>
            )}
            <div className='create-short-url__buttons'>
              <input
                type='button'
                className='blue-button'
                value='Generate Random Url'
                onClick={createRandomUrl}
              />
              <input type='submit' className='blue-button' value='Create Url' />
            </div>
          </form>
        </div>
      )}
      {displayShortUrlPanel && shortUrl !== '' && (
        <div className='short-url-panel'>
          <p className='create-short-url__label'>Short Url</p>
          <p>
            {window.location.origin}/{shortUrl}
          </p>
          <button
            className='blue-button'
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/${shortUrl}`
              );
              setDisplayShortUrlPanel(false);
            }}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export { GetShortUrlButton };

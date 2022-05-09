import React, { useState } from 'react';
import { UploadFile } from '../../services/UploadFile';
import './FileUploadForm.css';
const FileUploadForm = ({
  cancelHandle,
  userToken,
  projectId,
  folderName,
  addFileToList,
}) => {
  // const [filename, setFilename] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const fileUpload = {
      isPublic,
      description,
      file,
    };

    UploadFile({ fileUpload, userToken, projectId, folderName }).then(
      (file) => {
        addFileToList(file);
        cancelHandle();
      }
    );
  };

  return (
    <section className='file-upload__section'>
      <form onSubmit={handleSubmit} className='file-upload__form'>
        <div className='form-inputs'>
          <div className='file-upload__form-col1'>
            {/* <div className='form-element'>
              <label htmlFor='file-name' className='form-title'>
                Filename
              </label>
              <input
                type='text'
                name='file-name'
                placeholder='File name...'
                value={filename}
                onChange={(evt) => setFilename(evt.target.value)}
                className='form__input name-input'
              />
            </div> */}
            <div className='form-element'>
              <label className='form-title' htmlFor='file'>
                File
              </label>
              <input
                type='file'
                onChange={(evt) => setFile(evt.target.files[0])}
              />
            </div>
            <div className='form-element'>
              <label className='form-title' htmlFor='file-isPublic'>
                Privacy
              </label>
              <p>
                <input
                  type='radio'
                  name='public'
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                />
                <span>public</span>
              </p>
              <p>
                <input
                  type='radio'
                  name='private'
                  checked={isPublic === false}
                  onChange={() => {
                    setIsPublic(false);
                  }}
                />
                <span>private</span>
              </p>
            </div>
          </div>
          <div className='file-upload__form-col2'>
            <label
              htmlFor='file-description'
              className='description-title form-title'
            >
              Description
            </label>
            <textarea
              name='file-description'
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              className='description-input'
              placeholder='Add description here...'
            />
          </div>
        </div>
        <div className='form__butons'>
          <input type='submit' value='Upload File' className='blue-button' />
          <button className='blue-button' onClick={() => cancelHandle()}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export { FileUploadForm };

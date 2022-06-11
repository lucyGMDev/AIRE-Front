import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProjectPanel.css';
import { UserExists } from '../../services/UserServices';
import { UserSessionContext } from '../../context/UserSessionContext';
import { PROJECT_TYPES } from '../../utils/environmental';
import { CreateProject } from '../../services/ProjectServices';

const CreateProjectPanel = ({ displayPanel }) => {
  const navigation = useNavigate();
  const { user, userToken } = useContext(UserSessionContext);
  const [privacy, setPrivacy] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [coauthorInput, setCoauthorInput] = useState('');
  const [coauthorList, setCoauthorList] = useState([]);
  const [coauthorErrorMessage, setCoauthorErrorMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [typeProject, setTypeProject] = useState([]);
  const projectNameInput = useRef();
  const addCoauthorsInput = useRef();

  const changeTypeProject = (evt) => {
    if (typeProject.find((type) => type === evt.target.name) === undefined) {
      setTypeProject([...typeProject, evt.target.name]);
    } else {
      setTypeProject(typeProject.filter((type) => type !== evt.target.name));
    }
  };

  const removeCoauthor = (coauthor) => {
    if (coauthorList.find((username) => username === coauthor) !== undefined) {
      setCoauthorList(
        coauthorList.find((username) => username !== coauthor) || []
      );
    }
  };

  const addCoauhtors = async (evt) => {
    if (evt.key === 'Enter' && coauthorInput !== '') {
      if (
        coauthorList.find((coauthor) => coauthor === coauthorInput) !==
          undefined ||
        coauthorInput === user.username
      ) {
        if (coauthorInput === user.username) {
          setCoauthorErrorMessage('You are already an author of this project');
        } else {
          setCoauthorErrorMessage('This coauthor has alredy been added');
        }
        evt.target.blur();
        setCoauthorInput('');
        return;
      }
      const existe = await UserExists({ username: coauthorInput });
      if (!existe) {
        setCoauthorErrorMessage('This coauthor does not exists');
        evt.target.blur();
        setCoauthorInput('');
        return;
      }
      setCoauthorList([...coauthorList, coauthorInput]);
      setCoauthorInput('');
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (document.activeElement === addCoauthorsInput.current) {
      return;
    }
    if (projectName === '') {
      setNameErrorMessage('Project name can not be empty');
      projectNameInput.current.blur();
      return;
    }
    const project = {
      name: projectName,
      description: projectDescription,
      isPublic: privacy,
      showHistory,
      coauthors: coauthorList,
      type: typeProject,
    };
    CreateProject({ project, userToken }).then(({ projectId }) =>
      navigation(`/project/${projectId}`)
    );

    displayPanel(false);
  };

  return (
    <article className='create-panel'>
      <form onSubmit={handleSubmit}>
        <label className='create-panel__label' htmlFor='project-name'>
          Name
        </label>
        <input
          className='form__input'
          type='text'
          name='project-name'
          onFocus={() => {
            setNameErrorMessage('');
          }}
          onChange={(evt) => setProjectName(evt.target.value)}
          ref={projectNameInput}
        />
        {nameErrorMessage !== '' && (
          <span className='create-panel__error-message'>
            {nameErrorMessage}
          </span>
        )}
        <label className='create-panel__label' htmlFor='project-description'>
          Description
        </label>
        <textarea
          className='textarea__input'
          type='text'
          name='project-description'
          value={projectDescription}
          onChange={(evt) => {
            setProjectDescription(evt.target.value);
          }}
        />
        <label className='create-panel__label' htmlFor='project-isPublic'>
          Privacy
        </label>
        <p>
          <input
            type='radio'
            value='public'
            onChange={() => setPrivacy(true)}
            checked={privacy === true}
          />
          public
        </p>
        <p>
          <input
            type='radio'
            value='private'
            onChange={() => setPrivacy(false)}
            checked={privacy === false}
          />
          private
        </p>
        <label className='create-panel__label' htmlFor='project-isPublic'>
          Show History
        </label>
        <p>
          <input
            type='radio'
            value='showHistory'
            onChange={() => setShowHistory(true)}
            checked={showHistory === true}
          />
          Yes
        </p>
        <p>
          <input
            type='radio'
            value='notShowHistory'
            onChange={() => setShowHistory(false)}
            checked={showHistory === false}
          />
          No
        </p>
        <label className='create-panel__label'>Type</label>
        {PROJECT_TYPES.map((type) => {
          return (
            <div key={type}>
              <input type='checkbox' name={type} onChange={changeTypeProject} />
              <span>{type}</span>
            </div>
          );
        })}
        <label className='create-panel__label'>Add Coauthors</label>
        <input
          className='form__input'
          type='text'
          value={coauthorInput}
          onChange={(evt) => setCoauthorInput(evt.target.value)}
          onFocus={() => {
            setCoauthorErrorMessage('');
          }}
          onKeyDown={addCoauhtors}
          ref={addCoauthorsInput}
        />
        {coauthorErrorMessage !== '' && (
          <span className='create-panel__error-message'>
            {coauthorErrorMessage}
          </span>
        )}
        {coauthorList.length > 0 && (
          <p className='create-panel__coauthors-list-pannel'>Coauthors List</p>
        )}
        {coauthorList.map((coauthor) => {
          return (
            <div key={coauthor} className='create-panel__coauthor'>
              <span className='create-panel__coauthor-name'>{coauthor}</span>
              <img
                className='create-panel__coauthor-remove-button'
                src='/assets/cross_button.webp'
                onClick={() => removeCoauthor(coauthor)}
              />
            </div>
          );
        })}
        <div className='create-panel__buttons'>
          <input
            type='button'
            className='blue-button'
            onClick={() => {
              displayPanel(false);
            }}
            value='Cancel'
          />

          <input
            type='submit'
            className='blue-button'
            onClick={handleSubmit}
            value='Create'
          />
        </div>
      </form>
    </article>
  );
};

export { CreateProjectPanel };

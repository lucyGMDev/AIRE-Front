import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { PROJECT_TYPES } from '../../utils/environmental';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton';
import { GetShortUrlButton } from '../../components/GetShortUrlButton/GetShortUrlButton';
import { Header } from '../../components/Header/Header';
import ItemList from '../../components/ItemList/ItemList';
import { ListOfComments } from '../../components/ListOfComments/ListOfComments';
import { PostComment } from '../../components/PostComment/PostComment';
import { VersionsButton } from '../../components/VersionsButton/VersionsButton';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { getProject } from '../../Hooks/useGetProject';
import { useIsAuthor } from '../../Hooks/useIsAuthor';
import { getComments } from '../../services/GetComments';
import { getProjectItems } from '../../services/GetProjectItems';
import { GetVersions } from '../../services/GetVersions';
import { RateProject } from '../../services/RateProject';
import './ViewProject.css';
import { updateProject } from '../../services/UpdateProject';
import { deleteProject } from '../../services/DeleteProject';
import { CreateVersionButton } from '../../components/CreateVersionButton/CreateVersionButton';
import { UserExists } from '../../services/GetUser';
import { CoauthorList } from '../../components/CoauthorList/CoauthorList';
import { HistorialMessages } from '../../components/HistorialMessages/HistorialMessages';

const ViewProject = () => {
  const { projectId } = useParams();
  const navigation = useNavigate();
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const { userToken, user } = useContext(UserSessionContext);
  const [comments, setComments] = useState([]);
  const [offset] = useState(0);
  const [numberCommentsLoad] = useState(10);
  const [items, setItems] = useState([]);
  const [versions, setVersions] = useState([]);
  const [onRatingOver, setOnRatingOver] = useState(false);
  const { isAuthor } = useIsAuthor({ projectId, userToken });
  const [displayEditProject, setDisplayEditProject] = useState(false);
  const [displayHistory, setDisplayHistory] = useState(false);
  const [nameEditProject, setNameEditProject] = useState(
    project ? project.name : ''
  );
  const [descriptionEditProject, setDescriptionEditProject] = useState(
    project ? project.description : ''
  );

  const [isPublicEditProject, setIsPublicEditProject] = useState();
  const [showHistoryEdit, setShowHistoryEdit] = useState();

  const [projectTypes, setProjectTypes] = useState(project ? project.type : []);
  const [coauthorInput, setCoauthorInput] = useState('');
  const [coauthorErrorMessage, setCoauthorErrorMessage] = useState('');
  const [coauthorList, setCoauthorList] = useState(
    project ? project.coauthors : []
  );
  const coauthorInputRef = useRef();
  useEffect(() => {
    GetVersions({ projectId, userToken }).then((versionList) => {
      if (
        window.localStorage.getItem('version') === null ||
        parseInt(
          JSON.parse(window.localStorage.getItem('version')).projectId
        ) !== parseInt(projectId)
      ) {
        setVersion(versionList[0]);
        window.localStorage.setItem(
          'version',
          JSON.stringify({
            projectId: projectId,
            version: versionList[0],
          })
        );
      }
      setVersions(versionList);
    });
    if (project === null || project === undefined) {
      getProject({ projectId, userToken }).then((project) => {
        setProject(project);
        setShowHistoryEdit(project.showHistory);
        setIsPublicEditProject(project.isPublic);
        setCoauthorList(project.coauthors);
      });
    }
  }, [projectId, userToken]);
  useEffect(() => {
    getComments({
      projectId: projectId,
      offset: offset,
      numberCommentsLoad: numberCommentsLoad,
      userToken,
    }).then((comments) => {
      setComments(comments);
    });
  }, [projectId, offset, numberCommentsLoad]);

  useEffect(async () => {
    if (version === undefined) return;
    const items = await getProjectItems({
      projectId,
      versionName: version.name,
      userToken,
    });
    setItems(items);
  }, [version]);

  const rateProject = (rate) => {
    const rating = (rate * 5) / 100;
    RateProject({ rating, userToken, projectId });
  };

  const updateProjectHandler = async (evt) => {
    evt.preventDefault();
    if (coauthorInputRef.current === document.activeElement) {
      if (coauthorInput === '') return;
      if (coauthorList.includes(coauthorInput)) {
        setCoauthorErrorMessage('This coauthor has been alredy added');
        coauthorInput.current.blur();
        setCoauthorInput('');
        return;
      }
      const userExists = await UserExists({ username: coauthorInput });
      if (!userExists) {
        setCoauthorErrorMessage('There are not any user with this username');
        coauthorInputRef.current.blur();
        setCoauthorInput('');
        return;
      }
      setCoauthorList([...coauthorList, coauthorInput]);
      setCoauthorInput('');
      return;
    }

    const updatedProject = {
      name: nameEditProject,
      description: descriptionEditProject,
      isPublic: isPublicEditProject,
      showHistory: showHistoryEdit,
      type: projectTypes,
      coauthors: coauthorList,
    };
    updateProject({ projectId, updatedProject, userToken }).then((project) => {
      setProject(project);
      setDisplayEditProject(false);
    });
  };

  const deleteProjectHandler = () => {
    deleteProject({ projectId, userToken }).then(() => {
      navigation('/');
    });
  };

  const displayButtonHandle = () => {
    if (!displayEditProject) {
      setNameEditProject(project.name);
      setDescriptionEditProject(project.description || '');
      setIsPublicEditProject(project.isPublic);
      setProjectTypes(project.type || []);
      setCoauthorInput('');
      setCoauthorList(project.coauthors);
    }
    setDisplayEditProject(!displayEditProject);
  };

  const chageProjectType = (type) => {
    if (projectTypes.find((singleType) => singleType === type)) {
      setProjectTypes(projectTypes.filter((singleType) => singleType !== type));
    } else {
      setProjectTypes([...projectTypes, type]);
    }
  };
  const addVersionCreatedList = (version) => {
    setVersions([...versions, version]);
    window.localStorage.setItem(
      'version',
      JSON.stringify({ projectId, version })
    );
    setVersion(version);
  };

  const removeCoauthor = ({ coauthor }) => {
    if (coauthorList.includes(coauthor)) {
      setCoauthorList(
        coauthorList.filter((singleCoauthor) => singleCoauthor !== coauthor)
      );
    }
  };
  return (
    <React.Fragment>
      {project ? (
        <React.Fragment>
          <Header />
          <main className={`project`}>
            <div className='project-name'>
              <Link to={`/project/${projectId}`} className='project-link'>
                <p>/{project.name}</p>
              </Link>
            </div>
            <div className='project__buttons-controller'>
              <VersionsButton
                versions={versions}
                setVersions={setVersions}
                projectId={projectId}
              />
              {isAuthor && (
                <React.Fragment>
                  <CreateVersionButton
                    projectId={projectId}
                    addNewVersion={addVersionCreatedList}
                  />
                  <GetShortUrlButton
                    projectId={projectId}
                    versionName={version.name}
                  />
                  <button
                    className='blue-button project-setting__button'
                    onClick={displayButtonHandle}
                  >
                    Settings
                    <img
                      className='project-setting__icon'
                      src='/assets/setting-icon.webp'
                    />
                  </button>
                </React.Fragment>
              )}
              <DownloadButton projectId={projectId} />
            </div>
            {displayEditProject ? (
              <section className='project-section'>
                <form onSubmit={updateProjectHandler}>
                  <label
                    className='project-setting__label'
                    htmlFor='project-name'
                  >
                    Rename Project
                  </label>
                  <input
                    name='project-name'
                    placeholder='New project name ...'
                    className='form__input project-setting__input'
                    value={nameEditProject}
                    onChange={(evt) => {
                      setNameEditProject(evt.target.value);
                    }}
                  />
                  <label
                    className='project-setting__label'
                    htmlFor='project-description'
                  >
                    Description
                  </label>
                  <textarea
                    className='textarea__input'
                    name='project-description'
                    placeholder='New Description'
                    value={descriptionEditProject}
                    onChange={(evt) => {
                      setDescriptionEditProject(evt.target.value);
                    }}
                  />
                  <label
                    htmlFor='project-privay'
                    className='project-setting__label'
                  >
                    Privacy
                  </label>
                  <p>
                    <input
                      type='radio'
                      checked={!isPublicEditProject}
                      onChange={() => setIsPublicEditProject(false)}
                    />
                    Private
                  </p>
                  <p>
                    <input
                      type='radio'
                      checked={isPublicEditProject}
                      onChange={() => setIsPublicEditProject(true)}
                    />
                    Public
                  </p>
                  <label
                    htmlFor='project-privay'
                    className='project-setting__label'
                  >
                    Show History
                  </label>
                  <p>
                    <input
                      type='radio'
                      checked={!showHistoryEdit}
                      onChange={() => setShowHistoryEdit(false)}
                    />
                    No
                  </p>
                  <p>
                    <input
                      type='radio'
                      checked={showHistoryEdit}
                      onChange={() => setShowHistoryEdit(true)}
                    />
                    Yes
                  </p>
                  <label
                    htmlFor='project-categories'
                    className='project-setting__label'
                  >
                    Types
                  </label>
                  {PROJECT_TYPES.map((projectType) => {
                    return (
                      <p key={projectType}>
                        <input
                          type='checkbox'
                          checked={projectTypes.find(
                            (type) => type === projectType
                          )}
                          onChange={() => chageProjectType(projectType)}
                        />
                        <span className='blue-text'>{projectType}</span>
                      </p>
                    );
                  })}

                  <label
                    className='project-setting__label'
                    htmlFor='project-coauthors'
                  >
                    Add Coauthor
                  </label>
                  <input
                    ref={coauthorInputRef}
                    name='project-coauthors'
                    className='form__input project-setting__input'
                    placeholder='Introduce an username to add on the project'
                    value={coauthorInput}
                    onChange={(evt) => {
                      setCoauthorInput(evt.target.value);
                    }}
                    onFocus={() => setCoauthorErrorMessage('')}
                  />
                  <label className='project-setting__label'>Coauthors</label>
                  {coauthorErrorMessage !== '' && (
                    <p className='project-setting__error-message'>
                      {coauthorErrorMessage}
                    </p>
                  )}
                  <ul className='project-setting__coauthor-list'>
                    {coauthorList.map((coauthor) => {
                      return (
                        <li
                          key={coauthor}
                          className='project-setting__coauthor'
                        >
                          {coauthor}
                          {coauthor !== user.username && (
                            <img
                              src='/assets/cross_button.webp'
                              className='project-setting__remove-coauthor-button'
                              onClick={() => removeCoauthor({ coauthor })}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className='project-setting__buttons'>
                    <input
                      type='button'
                      className='blue-button'
                      onClick={deleteProjectHandler}
                      value='Delete Project'
                    />
                    <input
                      type='submit'
                      value='Update Project'
                      className='blue-button'
                    />
                  </div>
                </form>
              </section>
            ) : (
              <ItemList items={items} />
            )}

            <section className='project-section project-info'>
              <p className='project-info__description'>
                {project.description || 'This project has not description'}
              </p>
              <div
                onMouseEnter={() => setOnRatingOver(true)}
                onMouseLeave={() => setOnRatingOver(false)}
              >
                {onRatingOver && userToken && !isAuthor ? (
                  <Rating
                    initialValue={project.score}
                    fillColor='#0077b6'
                    transition
                    allowHalfIcon
                    onClick={rateProject}
                  />
                ) : (
                  <Rating
                    initialValue={project.score}
                    readonly
                    fillColor='#0077b6'
                  />
                )}
              </div>
            </section>
            <section className='project-section'>
              <h2 className='project-section__title'>Coauthors</h2>
              <CoauthorList authors={coauthorList} />
            </section>
            {(user || comments.length !== 0) && (
              <section className='project-section '>
                {user && (
                  <PostComment comments={comments} setComments={setComments} />
                )}
                {comments.length !== 0 && (
                  <ListOfComments
                    comments={comments}
                    setComments={setComments}
                  />
                )}
              </section>
            )}
          </main>
          {displayHistory ? (
            <HistorialMessages display={setDisplayHistory} />
          ) : (
            <img
              src='/assets/history_icon.webp'
              className='project__history-button'
              onClick={() => setDisplayHistory(true)}
            />
          )}
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export { ViewProject };

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton';
import { Header } from '../../components/Header/Header';
import ItemList from '../../components/ItemList/ItemList';
import { ListOfComments } from '../../components/ListOfComments/ListOfComments';
import { PostComment } from '../../components/PostComment/PostComment';
import { VersionsButton } from '../../components/VersionsButton/VersionsButton';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { useGetProject } from '../../Hooks/useGetProject';
import { getComments } from '../../services/GetComments';
import { getProjectItems } from '../../services/GetProjectItems';
import { GetVersions } from '../../services/GetVersions';
import { RateProject } from '../../services/RateProject';
import './ViewProject.css';

const ViewProject = () => {
  const { projectId } = useParams();
  const { project, setProject, version, setVersion } =
    useContext(ProjectContext);
  const [comments, setComments] = useState([]);
  const [offset] = useState(0);
  const [numberCommentsLoad] = useState(10);
  const [items, setItems] = useState([]);
  const [versions, setVersions] = useState([]);
  const [onRatingOver, setOnRatingOver] = useState(false);
  const { userToken } = useContext(UserSessionContext);
  useEffect(() => {
    GetVersions({ projectId }).then((versionList) => {
      if (
        window.localStorage.getItem('version') === null ||
        JSON.parse(window.localStorage.getItem('version')).projectId !==
          projectId
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
    if (project === undefined || project === null) {
      useGetProject({ projectId }).then((project) => {
        setProject(project);
      });
    }
  }, [projectId]);
  useEffect(() => {
    getComments({
      projectId: projectId,
      offset: offset,
      numberCommentsLoad: numberCommentsLoad,
    }).then((comments) => {
      setComments(comments);
    });
  }, [projectId, offset, numberCommentsLoad]);

  useEffect(async () => {
    if (version === undefined) return;
    const items = await getProjectItems({
      projectId,
      versionName: version.name,
    });
    setItems(items);
  }, [version]);

  const rateProject = (rate) => {
    const rating = (rate * 5) / 100;
    RateProject({ rating, userToken, projectId });
  };

  return (
    <React.Fragment>
      {project ? (
        <React.Fragment>
          <Header />
          <main className='project'>
            <div className='project-name'>
              <Link to={`/project/${projectId}`} className='project-link'>
                <p>/{project.name}</p>
              </Link>
            </div>
            <div className='project__buttons-controller'>
              <VersionsButton versions={versions} projectId={projectId} />
              <DownloadButton projectId={projectId} />
            </div>

            <ItemList items={items} />

            <section className='project-section project-info'>
              <p className='project-info__description'>
                {project.description || 'This project has not description'}
              </p>
              <div
                onMouseEnter={() => setOnRatingOver(true)}
                onMouseLeave={() => setOnRatingOver(false)}
              >
                {onRatingOver && userToken ? (
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
            <section className='project-section '>
              <PostComment comments={comments} setComments={setComments} />
              {comments.length !== 0 && <ListOfComments comments={comments} />}
            </section>
          </main>
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};

export { ViewProject };

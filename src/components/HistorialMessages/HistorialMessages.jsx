import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../../context/ProjectProvider';
import { UserSessionContext } from '../../context/UserSessionContext';
import { getHistorialMessages } from '../../services/HistoryServices';
import './HistorialMessages.css';

const HistorialMessages = ({ display }) => {
  const { projectId } = useParams();

  const { userToken } = useContext(UserSessionContext);
  const { version } = useContext(ProjectContext);
  const [historial, setHistorial] = useState([]);
  const [historialMetadata, setHistorialMetadata] = useState([]);
  useEffect(() => {
    getHistorialMessages({
      projectId,
      token: userToken,
      versionName: version.name,
    }).then(({ historial, historialMetaData }) => {
      console.log(historial);
      console.log(historialMetaData);
      setHistorial(historial);
      setHistorialMetadata(historialMetaData);
    });
  }, [projectId, userToken, version]);
  useEffect(() => {}, [projectId]);
  return (
    <article className='historial'>
      <section className='historial__messages'>
        <img
          src='/assets/cross_button.webp'
          className='historial__closeButton'
          onClick={() => display(false)}
        />
        <h2 className='historial__title'>History</h2>

        {historial &&
          historial.length > 0 &&
          historialMetadata.length > 0 &&
          historial.map((historialMessage, mensajeNumber) => {
            return (
              <div key={mensajeNumber}>
                <span className='historial__message-date'>
                  {historialMetadata[mensajeNumber].changeDate}
                </span>
                <p className='historial__message'>{historialMessage}</p>
              </div>
            );
          })}
      </section>
    </article>
  );
};

export { HistorialMessages };

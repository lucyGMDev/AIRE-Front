import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserSessionContext } from '../../context/UserSessionContext';
import { GetUserByEmail } from '../../services/GetUser';
import { PostComment } from '../PostComment/PostComment';
import { UserPicture } from '../UserPicture/UserPicture';
import { getCommentResponses } from '../../services/GetComments';
import './ProjectComment.css';
import { ListOfComments } from '../ListOfComments/ListOfComments';
const ProjectComment = ({
  commentId,
  writterEmail,
  commentText,
  postDate,
  numberResponses,
  reply,
}) => {
  const [user, setUser] = useState({});
  const { userToken } = useContext(UserSessionContext);
  const [displayReplay, setDisplayReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyComments, setReplyComments] = useState([]);
  const { projectId } = useParams();
  useEffect(() => {
    GetUserByEmail({ userEmail: writterEmail }).then((user) => {
      setUser(user);
    });
  }, []);

  const replyHandler = () => {
    setDisplayReply(true);
  };

  const showRepliesHandler = () => {
    setShowReplies(true);
    getCommentResponses({
      projectId,
      userToken,
      offset: 0,
      numberCommentsLoad: 10,
      commentResponseId: commentId,
    }).then((comments) => setReplyComments(comments));
  };

  const hiddenRepliesHandler = () => {
    setShowReplies(false);
  };

  return (
    <article className='comment'>
      <UserPicture pictureUrl={user.pictureUrl} />
      <div className='comment__body'>
        <div className='comment__body-header'>
          <p className='comment__writter-email'>{writterEmail}</p>
          <p className='comment__post-date'>{postDate}</p>
        </div>
        <p className='comment__comment-text'>{commentText}</p>
        {userToken && !reply && (
          <React.Fragment>
            {displayReplay ? (
              <PostComment
                comments={replyComments}
                setComments={setReplyComments}
                replyCommentId={commentId}
                setDisplayReply={setDisplayReply}
                showRepliesHandler={showRepliesHandler}
              />
            ) : (
              <p>
                <span className='comment__replay' onClick={replyHandler}>
                  Reply comment
                </span>
              </p>
            )}
          </React.Fragment>
        )}
        {numberResponses > 0 && !showReplies && (
          <span
            className='comment__view-replies-button'
            onClick={showRepliesHandler}
          >
            Show replies
          </span>
        )}
        {numberResponses > 0 && showReplies && (
          <React.Fragment>
            <ListOfComments comments={replyComments} replyList />
            <span
              className='comment__view-replies-button'
              onClick={hiddenRepliesHandler}
            >
              Hidden replies
            </span>
          </React.Fragment>
        )}
      </div>
    </article>
  );
};

export { ProjectComment };
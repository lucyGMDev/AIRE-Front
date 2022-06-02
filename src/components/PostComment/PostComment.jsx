import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserSessionContext } from '../../context/UserSessionContext';
import { UserPicture } from '../UserPicture/UserPicture';
import { PostAComment } from '../../services/PostComment';
import './PostComment.css';

const PostComment = ({
  comments,
  setComments,
  replyCommentId,
  setDisplayReply,
  showRepliesHandler,
}) => {
  const { user, userToken } = useContext(UserSessionContext);
  const { projectId } = useParams();
  const [commentText, setCommentText] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  const inputFocusHandler = (focus) => {
    setInputFocused(focus);
  };
  const onChangeHandler = (evt) => {
    setCommentText(evt.target.value);
  };

  const postComment = (evt) => {
    PostAComment({
      projectId,
      username: user.username,
      commentText,
      responseCommentId: replyCommentId,
      userToken,
    }).then(({ comment }) => {
      const newComments = [...comments];
      if (replyCommentId) {
        showRepliesHandler();
        newComments.push(comment);
      } else {
        newComments.unshift(comment);
      }
      setComments(newComments);
    });
    setCommentText('');
    setInputFocused(false);

    evt.preventDefault();
  };

  const cancelPostComment = () => {
    if (replyCommentId) {
      setDisplayReply(false);
    } else {
      setInputFocused(false);
    }
    setCommentText('');
  };
  return (
    <article className='post-comment'>
      <UserPicture pictureUrl={user.pictureUrl} />
      <div className='post-comment__body'>
        <span className='post-comment__username'>{user.username}</span>
        <form onSubmit={postComment}>
          <input
            className='form__input post-comment_input'
            type='text'
            placeholder='Add a comment ...'
            value={commentText}
            onChange={onChangeHandler}
            onFocus={() => inputFocusHandler(true)}
          />
          {(inputFocused || replyCommentId) && (
            <div className='post-comment__buttons'>
              <span className='blue-button' onClick={cancelPostComment}>
                Cancel
              </span>
              <input
                type='submit'
                value='Post comment'
                className='blue-button'
              />
            </div>
          )}
        </form>
      </div>
    </article>
  );
};

export { PostComment };

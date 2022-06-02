import React from 'react';
import { ProjectComment } from '../ProjectComment/ProjectComment';

const ListOfComments = ({ comments, replyList, setComments }) => {
  console.log(comments);
  const removeComment = ({ commentId }) => {
    setComments(
      comments.filter(
        (comment) =>
          comment.commentId !== commentId &&
          comment.responseCommentId !== commentId
      )
    );
  };
  return (
    <React.Fragment>
      {comments.map(
        ({ commentId, username, commentText, postDate, numberResponses }) => {
          return (
            <React.Fragment key={commentId}>
              {replyList ? (
                <ProjectComment
                  commentId={commentId}
                  username={username}
                  commentText={commentText}
                  postDate={postDate}
                  numberResponses={numberResponses}
                  removeComment={(commentId) => removeComment(commentId)}
                  reply
                />
              ) : (
                <ProjectComment
                  commentId={commentId}
                  username={username}
                  commentText={commentText}
                  postDate={postDate}
                  numberResponses={numberResponses}
                  removeComment={(commentId) => removeComment(commentId)}
                />
              )}
            </React.Fragment>
          );
        }
      )}
    </React.Fragment>
  );
};

export { ListOfComments };

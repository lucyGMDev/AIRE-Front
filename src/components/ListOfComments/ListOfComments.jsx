import React from 'react';
import { ProjectComment } from '../ProjectComment/ProjectComment';

const ListOfComments = ({ comments, replyList }) => {
  return (
    <React.Fragment>
      {comments.map(
        ({
          commentId,
          writterEmail,
          commentText,
          postDate,
          numberResponses,
        }) => {
          return (
            <React.Fragment key={commentId}>
              {replyList ? (
                <ProjectComment
                  commentId={commentId}
                  writterEmail={writterEmail}
                  commentText={commentText}
                  postDate={postDate}
                  numberResponses={numberResponses}
                  reply
                />
              ) : (
                <ProjectComment
                  commentId={commentId}
                  writterEmail={writterEmail}
                  commentText={commentText}
                  postDate={postDate}
                  numberResponses={numberResponses}
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

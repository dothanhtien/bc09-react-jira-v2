import React from "react";
import CommentItem from "../CommentItem";

const CommentList = ({ taskId, comments, onUpdateSuccess }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            taskId={taskId}
            comment={comment}
            onUpdateSuccess={onUpdateSuccess}
          />
        );
      })}
    </div>
  );
};

export default CommentList;

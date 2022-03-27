import React from "react";
import { Button, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../store/selector";
import { deleteComment } from "../../../store/actions/comment";

const ConfirmDeleteCommentModal = ({
  visible,
  commentId,
  onCancel,
  onDeleteSuccess,
}) => {
  const dispatch = useDispatch();
  const deletingCommentSelector = createLoadingSelector(["DELETE_COMMENT"]);
  const isDeletingComment = useSelector((state) =>
    deletingCommentSelector(state)
  );

  const handleDeleteComment = () => {
    dispatch(deleteComment(commentId, () => onDeleteSuccess()));
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={416}
      style={{ top: 80 }}
      closable={false}
      maskClosable={!isDeletingComment} // prevent user from closing modal while deleting
      footer={null}
    >
      <div className="flex justify-start">
        <Typography.Text type="warning">
          <ExclamationCircleOutlined
            style={{ fontSize: 22 }}
            className="mr-4"
          />
        </Typography.Text>
        <div>
          <Typography.Title level={5} style={{ fontWeight: 500 }}>
            Are you sure delete this comment?
          </Typography.Title>
          <Typography.Text>
            This comment will be permanently deleted.
          </Typography.Text>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={onCancel} disabled={isDeletingComment}>
          Cancel
        </Button>
        <Button
          danger
          className="ml-2"
          onClick={handleDeleteComment}
          loading={isDeletingComment}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteCommentModal;

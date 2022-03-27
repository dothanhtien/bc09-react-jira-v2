import React, { useState } from "react";
import { Avatar, Button, Comment, Form, Typography } from "antd";
import parse from "html-react-parser";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TinyMCEEditor from "../../ui/Input/TinyMCEEditor";
import { updateComment } from "../../../store/actions/comment";
import ConfirmDeleteCommentModal from "../ConfirmDeleteCommentModal";

const CommentItem = ({ comment, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const { avatar, commentContent: contentComment, id, name } = comment;
  const [showEditCommentInput, setShowEditCommentInput] = useState(false);
  const [showConfirmDeleteCommentModal, setShowComfirmDeleteCommentModal] =
    useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      id,
      contentComment,
    },
  });

  const onSubmit = (data) => {
    if (!data.contentComment || !data.contentComment.trim()) {
      return;
    }

    dispatch(
      updateComment(data, () => {
        setShowEditCommentInput(false);
        onUpdateSuccess();
      })
    );
  };

  const onCancel = () => {
    reset();
    setShowEditCommentInput(false);
  };

  const actions = [
    <Button
      type="link"
      className="p-0 mr-2"
      onClick={() => setShowEditCommentInput(true)}
    >
      Edit
    </Button>,
    <Button
      type="link"
      className="p-0"
      danger
      onClick={() => setShowComfirmDeleteCommentModal(true)}
    >
      Delete
    </Button>,
  ];

  return (
    <>
      <Comment
        actions={!showEditCommentInput && actions}
        author={<Typography.Text strong>{name}</Typography.Text>}
        avatar={<Avatar src={avatar} alt={name} />}
        content={
          <>
            {!showEditCommentInput && (
              <div className="custom-html-parser">{parse(contentComment)}</div>
            )}

            {showEditCommentInput && (
              <Form onFinish={handleSubmit(onSubmit)}>
                <Controller
                  name="contentComment"
                  control={control}
                  render={({ field }) => (
                    <Form.Item style={{ minHeight: 200 }}>
                      <TinyMCEEditor
                        value={field.value}
                        onEditorChange={field.onChange}
                      />
                    </Form.Item>
                  )}
                />

                <Form.Item>
                  <Button htmlType="submit" type="primary" className="mr-2">
                    Save
                  </Button>
                  <Button onClick={onCancel}>Cancel</Button>
                </Form.Item>
              </Form>
            )}
          </>
        }
      />

      {showConfirmDeleteCommentModal && (
        <ConfirmDeleteCommentModal
          visible={showConfirmDeleteCommentModal}
          commentId={id}
          onCancel={() => setShowComfirmDeleteCommentModal(false)}
          onDeleteSuccess={onUpdateSuccess}
        />
      )}
    </>
  );
};

export default CommentItem;

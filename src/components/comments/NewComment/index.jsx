import React, { useState } from "react";
import { Avatar, Button, Comment, Form } from "antd";
import TinyMCEEditor from "../../ui/Input/TinyMCEEditor";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { insertComment } from "../../../store/actions/comment";
import { createLoadingSelector } from "../../../store/selector";

const NewComment = ({ taskId, onInsertSuccess }) => {
  const dispatch = useDispatch();
  const insertingCommentSelector = createLoadingSelector(["INSERT_COMMENT"]);
  const isInsertingComment = useSelector((state) =>
    insertingCommentSelector(state)
  );
  const [showNewCommentInput, setShowNewCommentInput] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      taskId,
      contentComment: "",
    },
  });

  const onSubmit = (data) => {
    if (!data.contentComment || !data.contentComment.trim()) {
      return;
    }

    dispatch(
      insertComment(data, () => {
        reset();
        setShowNewCommentInput(false);
        onInsertSuccess();
      })
    );
  };

  const onCancel = () => {
    reset();
    setShowNewCommentInput(false);
  };

  return (
    <Comment
      avatar={
        <Avatar src="https://ui-avatars.com/api/?name=Tien Do" alt="Tien Do" />
      }
      content={
        <>
          {!showNewCommentInput && (
            <div
              className="p-2 border hover:bg-gray-200 duration-300 rounded cursor-text"
              onClick={() => setShowNewCommentInput(true)}
            >
              Add a comment...
            </div>
          )}

          {showNewCommentInput && (
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
                <Button
                  htmlType="submit"
                  type="primary"
                  className="mr-2"
                  loading={isInsertingComment}
                >
                  Save
                </Button>
                <Button onClick={onCancel} disabled={isInsertingComment}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      }
    />
  );
};

export default NewComment;

import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import TinyMCEEditor from "../../../ui/Input/TinyMCEEditor";
import { updateDescription } from "../../../../store/actions/task";

const TaskDescriptionForm = ({ taskId, description, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      taskId,
      description,
    },
  });

  const onSubmit = (data) => {
    // check if description no changed
    if (description === data.description) return;

    dispatch(
      updateDescription(data, () => {
        setShowDescriptionInput(false);
        onUpdateSuccess();
      })
    );
  };

  const handleCancelEditTaskDescription = () => {
    setValue("description", description);
    setShowDescriptionInput(false);
  };

  return (
    <div className="description-container mb-6">
      <Typography.Text strong className="pl-1">
        Description
      </Typography.Text>

      {!showDescriptionInput && (
        <div
          className="p-1 hover:bg-gray-200 duration-300 rounded cursor-text"
          onClick={() => setShowDescriptionInput(true)}
        >
          {description === "" && (
            <Typography.Text type="secondary">
              Add a description...
            </Typography.Text>
          )}
          {description && parse(description)}
        </div>
      )}

      {showDescriptionInput && (
        <Form className="pl-1" onFinish={handleSubmit(onSubmit)}>
          <Controller
            name="description"
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
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button className="ml-2" onClick={handleCancelEditTaskDescription}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default TaskDescriptionForm;

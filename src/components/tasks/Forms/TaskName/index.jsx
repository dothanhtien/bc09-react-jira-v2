import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";

const TaskNameForm = ({ task }) => {
  const [showTaskNameInput, setShowTaskNameInput] = useState(false);
  const taskNameInputRef = useRef(null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      taskName: task.taskName,
    },
  });

  useEffect(() => {
    if (showTaskNameInput) taskNameInputRef.current.focus();
  }, [showTaskNameInput]);

  const handleKeyDownTaskNameInput = (e) => {
    // handle press ESC button
    if (e.keyCode === 27) {
      handleCancelEditTaskName();
    }

    // handle press Enter button
    if (e.keyCode === 13) {
      // prevent breakline
      e.preventDefault();
      // handleSubmitTaskName();
    }
  };

  const onSubmit = (data) => {
    setShowTaskNameInput(false);

    // check if taskName no changed
    if (data.taskName === task.taskName) return;

    // call api here
    // replacement for api calling action (lỗi backend: không update được taskName)
    Modal.warning({
      title: "Opps! This feature is under construction",
      content: "We're sorry for this inconvenience",
      style: { top: 80 },
      onOk: () => {
        setValue("taskName", task.taskName);
      },
    });
  };

  const handleCancelEditTaskName = () => {
    setShowTaskNameInput(false);
    setValue("taskName", task.taskName);
  };

  return (
    <div className="task-name-container relative">
      <Typography.Title
        level={4}
        className={`p-1 rounded hover:bg-gray-200 duration-300 border border-solid border-transparent hover:border-gray-200${
          !showTaskNameInput ? " block" : " hidden"
        }`}
        onClick={() => setShowTaskNameInput(true)}
      >
        {task.taskName}
      </Typography.Title>

      <Form className={showTaskNameInput ? " block" : " hidden"}>
        <Controller
          name="taskName"
          control={control}
          render={({ field }) => (
            <Form.Item>
              <Input.TextArea
                {...field}
                ref={taskNameInputRef}
                className="text-xl font-semibold p-1 rounded resize-none"
                style={{ lineHeight: 1.4 }}
                onKeyDown={handleKeyDownTaskNameInput}
              />
            </Form.Item>
          )}
        />

        <div
          className={`absolute bottom-0 right-0 pt-1 block`}
          style={{ transform: "translateY(100%)" }}
        >
          <Button
            htmlType="submit"
            icon={<CheckOutlined className="text-xs" />}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow mr-1 p-0"
            onClick={handleSubmit(onSubmit)}
          />
          <Button
            htmlType="button"
            icon={<CloseOutlined className="text-xs" />}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 hover:text-black focus:text-black border-0 shadow p-0"
            onClick={handleCancelEditTaskName}
          />
        </div>
      </Form>
    </div>
  );
};

export default TaskNameForm;

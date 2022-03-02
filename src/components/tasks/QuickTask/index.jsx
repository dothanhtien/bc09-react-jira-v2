import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Select, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ReactComponent as BugIcon } from "../../../assets/images/icons/bug.svg";
import { ReactComponent as NewTaskIcon } from "../../../assets/images/icons/new_task.svg";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createErrorMessageSelector } from "../../../store/selector";
import { fetchProjectDetails } from "../../../store/actions/project";
import { createTask, fetchTaskTypes } from "../../../store/actions/task";

const QuickTask = ({ projectId }) => {
  const dispatch = useDispatch();
  const createTaskErrorMessageSelector = createErrorMessageSelector([
    "CREATE_TASK",
  ]);
  const createTaskErrorMessage = useSelector((state) =>
    createTaskErrorMessageSelector(state)
  );
  const { taskTypes } = useSelector((state) => state.task);
  const [showQuickTaskFrom, setShowQuickTaskForm] = useState(false);
  const quickTaskRef = useRef(null);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "1",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: parseInt(projectId),
      typeId: 1,
      priorityId: 2,
    },
  });

  useEffect(() => {
    dispatch(fetchTaskTypes);
  }, [dispatch]);

  useEffect(() => {
    if (createTaskErrorMessage === "task already exists!") {
      setError("taskName", { type: "manual", message: "Task already exists!" });
    }
  }, [createTaskErrorMessage, setError]);

  const onSubmit = (data) => {
    dispatch(
      createTask(data, () => {
        dispatch(fetchProjectDetails({ id: projectId }));
        reset();
        setShowQuickTaskForm(false);
      })
    );
  };

  const handleKeyDownQuickTaskTextarea = (e) => {
    // if press ESC key
    if (e.keyCode === 27) {
      reset();
      setShowQuickTaskForm(false);
    }

    // handling press down Enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      const trimmedTaskName = getValues("taskName").trim();

      // check if just blank
      if (!trimmedTaskName.length) return;

      setValue("taskName", trimmedTaskName);

      handleSubmit(onSubmit)();
    }
  };

  const handleTaskTypeDropdownVisibleChange = (open) => {
    if (!open) {
      quickTaskRef.current.focus();
    }
  };

  const renderTaskTypeOption = () => {
    return taskTypes?.map((type) => (
      <Select.Option
        key={type.id}
        value={type.id}
        label={
          <div style={{ lineHeight: "34px" }}>
            <Tooltip
              title={
                type.taskType.charAt(0).toUpperCase() + type.taskType.slice(1)
              }
              placement="bottom"
            >
              {type.id === 1 && <BugIcon />}
              {type.id === 2 && <NewTaskIcon />}
            </Tooltip>
          </div>
        }
      >
        <div className="flex justify-start items-center">
          {type.id === 1 && <BugIcon className="mr-1" />}
          {type.id === 2 && <NewTaskIcon className="mr-1" />}
          <span>
            {type.taskType.charAt(0).toUpperCase() + type.taskType.slice(1)}
          </span>
        </div>
      </Select.Option>
    ));
  };

  return (
    <>
      {!showQuickTaskFrom && (
        <Button
          className="mt-1 rounded"
          icon={<PlusOutlined />}
          onClick={() => setShowQuickTaskForm(true)}
        >
          Create
        </Button>
      )}

      {showQuickTaskFrom && (
        <Form onFinish={handleSubmit(onSubmit)} className="relative">
          <Controller
            name="taskName"
            control={control}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors.taskName && "error"}
                help={errors.taskName?.message}
              >
                <Input.TextArea
                  {...field}
                  ref={quickTaskRef}
                  autoSize
                  autoFocus
                  placeholder="What needs to be done? Press ESC to cancel."
                  className="mt-1 pb-8 py-2 px-2 outline-none resize-none rounded"
                  onKeyDown={handleKeyDownQuickTaskTextarea}
                />
              </Form.Item>
            )}
          />

          <Controller
            name="typeId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                bordered={false}
                optionLabelProp="label"
                dropdownMatchSelectWidth={false}
                className="absolute bottom-7"
                onDropdownVisibleChange={handleTaskTypeDropdownVisibleChange}
              >
                {renderTaskTypeOption()}
              </Select>
            )}
          />
        </Form>
      )}
    </>
  );
};

export default QuickTask;

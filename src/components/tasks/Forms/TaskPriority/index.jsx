import React from "react";
import { Form, Select, Typography } from "antd";
import { ReactComponent as HighPriorityIcon } from "../../../../assets/images/icons/priorities/high.svg";
import { ReactComponent as MediumPriorityIcon } from "../../../../assets/images/icons/priorities/medium.svg";
import { ReactComponent as LowPriorityIcon } from "../../../../assets/images/icons/priorities/low.svg";
import { ReactComponent as LowestPriorityIcon } from "../../../../assets/images/icons/priorities/lowest.svg";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePriority } from "../../../../store/actions/task";

const TaskPriorityForm = ({ task, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      taskId: task.taskId,
      priorityId: task.priorityTask.priorityId,
    },
  });

  const renderOptions = () => {
    return (
      <>
        <Select.Option value={1}>
          <div className="flex justify-start items-center">
            <HighPriorityIcon className="mr-2" />
            <span>High</span>
          </div>
        </Select.Option>
        <Select.Option value={2}>
          <div className="flex justify-start items-center">
            <MediumPriorityIcon className="mr-2" />
            <span>Medium</span>
          </div>
        </Select.Option>
        <Select.Option value={3}>
          <div className="flex justify-start items-center">
            <LowPriorityIcon className="mr-2" />
            <span>Low</span>
          </div>
        </Select.Option>
        <Select.Option value={4}>
          <div className="flex justify-start items-center">
            <LowestPriorityIcon className="mr-2" />
            <span>Lowest</span>
          </div>
        </Select.Option>
      </>
    );
  };

  const onSubmit = (data) => {
    dispatch(updatePriority(data, () => onUpdateSuccess()));
  };

  const handleChangePriority = (value) => {
    setValue("priorityId", value);

    handleSubmit(onSubmit)();
  };

  return (
    <Form layout="horizontal">
      <Controller
        name="priorityId"
        control={control}
        render={({ field }) => (
          <Form.Item
            label={<Typography.Text strong>Priority</Typography.Text>}
            colon={false}
            labelCol={{ span: 4 }}
            labelAlign="left"
            className="pl-1"
          >
            <Select
              {...field}
              onChange={handleChangePriority}
              showArrow={false}
              bordered={false}
              className="hover:bg-gray-200 rounded"
            >
              {renderOptions()}
            </Select>
          </Form.Item>
        )}
      />
    </Form>
  );
};

export default TaskPriorityForm;

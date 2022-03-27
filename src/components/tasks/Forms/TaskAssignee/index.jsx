import React from "react";
import { Avatar, Form, Select, Tag, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { updateTask } from "../../../../store/actions/task";

const TaskAssignee = ({ task, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const { projectDetails } = useSelector((state) => state.project);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      listUserAsign: task.assigness.map((assignee) => assignee.id),
    },
  });

  const onSubmit = (data) => {
    let clonedTask = { ...task };

    const removedProperties = [
      "alias",
      "assigness",
      "lstComment",
      "priorityId",
      "priorityTask",
      "taskTypeDetail",
      "typeId",
    ];
    
    for (const key in clonedTask) {
      if (removedProperties.includes(key)) {
        delete clonedTask[key];
      }
    }

    clonedTask = {
      ...clonedTask,
      ...data,
      priorityId: task.priorityTask.priorityId,
      typeId: task.taskTypeDetail.id,
    };

    dispatch(updateTask(clonedTask, () => onUpdateSuccess()));
  };

  const handleChangeAssignees = (value) => {
    setValue("listUserAsign", value);
    handleSubmit(onSubmit)();
  };

  return (
    <Form layout="horizontal">
      <Controller
        name="listUserAsign"
        control={control}
        render={({ field }) => (
          <Form.Item
            className="pl-1"
            label={<Typography.Text strong>Assignees</Typography.Text>}
            colon={false}
            labelCol={{ span: 4 }}
            labelAlign="left"
          >
            <Select
              {...field}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Choose assignees..."
              value={field.value}
              onChange={handleChangeAssignees}
              bordered={false}
              className="hover:bg-gray-200 rounded"
              tagRender={(props) => {
                const onPreventMouseDown = (event) => {
                  event.preventDefault();
                  event.stopPropagation();
                };

                return (
                  <Tag
                    closable
                    onMouseDown={onPreventMouseDown}
                    onClose={props.onClose}
                    className="flex items-center py-1 my-0.5 rounded"
                  >
                    {props.label}
                  </Tag>
                );
              }}
            >
              {projectDetails.members.map((member) => {
                return (
                  <Select.Option key={member.userId} value={member.userId}>
                    <div className="flex justify-start items-center">
                      <Avatar
                        size="small"
                        className="mr-1"
                        src={member.avatar}
                      />
                      <Typography.Text>{member.name}</Typography.Text>
                    </div>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
      />
    </Form>
  );
};

export default TaskAssignee;

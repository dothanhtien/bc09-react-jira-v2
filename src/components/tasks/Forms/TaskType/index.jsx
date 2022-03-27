import React, { useEffect } from "react";
import { Select, Tooltip } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as BugIcon } from "../../../../assets/images/icons/bug.svg";
import { ReactComponent as NewTaskIcon } from "../../../../assets/images/icons/new_task.svg";
import { fetchTaskTypes, updateTask } from "../../../../store/actions/task";

const TaskTypeForm = ({ task, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const { taskTypes } = useSelector((state) => state.task);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      typeId: task.taskTypeDetail.id,
    },
  });

  useEffect(() => {
    dispatch(fetchTaskTypes);
  }, [dispatch]);

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
      ...data,
      ...clonedTask,
      listUserAsign: task.assigness.map((assignee) => assignee.id),
      priorityId: task.priorityTask.priorityId,
    };

    dispatch(updateTask(clonedTask, () => onUpdateSuccess()));
  };

  const handleChangeTaskType = (value) => {
    setValue("typeId", value);
    handleSubmit(onSubmit)();
  };

  return (
    <Controller
      name="typeId"
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onChange={handleChangeTaskType}
          bordered={false}
          showArrow={false}
          className="mb-1 hover:bg-gray-100 rounded hover:shadow"
          dropdownMatchSelectWidth={false}
          style={{ marginLeft: "-8px" }}
        >
          {taskTypes.map((type) => {
            return (
              <Select.Option
                key={type.id}
                value={type.id}
                label={
                  <div className="h-full flex items-center">
                    <Tooltip
                      title={
                        type.taskType.charAt(0).toUpperCase() +
                        type.taskType.slice(1)
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
                    {type.taskType.charAt(0).toUpperCase() +
                      type.taskType.slice(1)}
                  </span>
                </div>
              </Select.Option>
            );
          })}
        </Select>
      )}
    />
  );
};

export default TaskTypeForm;

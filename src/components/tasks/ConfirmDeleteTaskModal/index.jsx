import React from "react";
import { Button, Modal, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../store/selector";
import { deleteTask } from "../../../store/actions/task";

const ConfirmDeleteTaskModal = ({
  visible,
  task: { taskId, taskName },
  onCancel,
  onDeleteSuccess,
}) => {
  const dispatch = useDispatch();
  const deletingTaskSelector = createLoadingSelector(["DELETE_TASK"]);
  const isDeletingTask = useSelector((state) => deletingTaskSelector(state));

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId, () => onDeleteSuccess()));
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={416}
      style={{ top: 80 }}
      closable={false}
      maskClosable={!isDeletingTask} // prevent user from closing modal while deleting
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
            Are you sure delete this task?
          </Typography.Title>
          <Typography.Text>
            The task <Typography.Text type="danger">{taskName}</Typography.Text>
            &nbsp; will be permanently deleted.
          </Typography.Text>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={onCancel} disabled={isDeletingTask}>
          Cancel
        </Button>
        <Button
          danger
          className="ml-2"
          onClick={handleDeleteTask}
          loading={isDeletingTask}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteTaskModal;

import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import TaskTypeForm from "../Forms/TaskType";
import ConfirmDeleteTaskModal from "../ConfirmDeleteTaskModal";
import TaskNameForm from "../Forms/TaskName";
import TaskDescriptionForm from "../Forms/TaskDescription";
import TaskAssigneeForm from "../Forms/TaskAssignee";
import TaskPriorityForm from "../Forms/TaskPriority";
import NewComment from "../../comments/NewComment";
import CommentList from "../../comments/CommentList";
import { fetchTaskDetails } from "../../../store/actions/task";

const EditTaskModal = ({ visible, taskId, onCancel, onUpdateSuccess }) => {
  const dispatch = useDispatch();
  const { taskDetails } = useSelector((state) => state.task);
  const [showConfirmDeleteTaskModal, setShowConfirmDeleteTaskModal] =
    useState(false);

  useEffect(() => {
    dispatch(fetchTaskDetails(taskId));
  }, [dispatch, taskId]);

  const handleDeleteTaskSuccess = () => {
    setShowConfirmDeleteTaskModal(false);
    onUpdateSuccess();
    onCancel();
  };

  const handleUpdateTaskSuccess = () => {
    dispatch(fetchTaskDetails(taskId));
  };

  return (
    <>
      <Modal
        visible={visible}
        closable={false}
        maskClosable={false}
        onCancel={onCancel}
        width={980}
        footer={null}
        keyboard={false}
      >
        {taskDetails && (
          <>
            <div className="flex justify-between">
              <div>
                <TaskTypeForm
                  task={taskDetails}
                  onUpdateSuccess={onUpdateSuccess}
                />
              </div>

              <div>
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setShowConfirmDeleteTaskModal(true)}
                />
                <Button
                  type="link"
                  icon={<CloseOutlined />}
                  className="text-black hover:text-black focus:text-black ml-1"
                  onClick={onCancel}
                />
              </div>
            </div>

            <TaskNameForm task={taskDetails} />

            <TaskPriorityForm
              task={taskDetails}
              onUpdateSuccess={onUpdateSuccess}
            />

            <TaskAssigneeForm
              task={taskDetails}
              onUpdateSuccess={onUpdateSuccess}
            />

            <TaskDescriptionForm
              taskId={taskId}
              description={taskDetails.description}
              onUpdateSuccess={handleUpdateTaskSuccess}
            />

            <div className="activities ml-1">
              <Typography.Text strong>Comments</Typography.Text>

              <NewComment
                taskId={taskId}
                onInsertSuccess={handleUpdateTaskSuccess}
              />

              <CommentList
                taskId={taskId}
                comments={taskDetails.lstComment}
                onUpdateSuccess={handleUpdateTaskSuccess}
              />
            </div>
          </>
        )}
      </Modal>

      {taskDetails && (
        <ConfirmDeleteTaskModal
          visible={showConfirmDeleteTaskModal}
          onCancel={() => setShowConfirmDeleteTaskModal(false)}
          onDeleteSuccess={handleDeleteTaskSuccess}
          task={taskDetails}
        />
      )}
    </>
  );
};

export default EditTaskModal;

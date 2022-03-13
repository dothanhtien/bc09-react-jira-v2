import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import TaskTypeForm from "../Forms/TaskType";
import ConfirmDeleteTaskModal from "../ConfirmDeleteTaskModal";
import TaskNameForm from "../Forms/TaskName";

const EditTaskModal = ({ visible, task, onCancel, onUpdateSuccess }) => {
  const [showConfirmDeleteTaskModal, setShowConfirmDeleteTaskModal] =
    useState(false);

  const handleDeleteTaskSuccessfully = () => {
    setShowConfirmDeleteTaskModal(false);
    onUpdateSuccess();
    onCancel();
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
        <div className="flex justify-between">
          <div>
            <TaskTypeForm task={task} onUpdateSuccess={onUpdateSuccess} />
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

        <TaskNameForm task={task} />
      </Modal>

      <ConfirmDeleteTaskModal
        visible={showConfirmDeleteTaskModal}
        onCancel={() => setShowConfirmDeleteTaskModal(false)}
        onDeleteSuccess={handleDeleteTaskSuccessfully}
        task={task}
      />
    </>
  );
};

export default EditTaskModal;

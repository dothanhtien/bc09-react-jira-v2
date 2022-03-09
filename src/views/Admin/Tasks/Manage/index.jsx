import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { Col, Row, Spin, Typography } from "antd";
import BackButton from "../../../../components/ui/Button/BackButton";
import TaskListTitle from "../../../../components/tasks/TaskListTitle";
import TaskItem from "../../../../components/tasks/TaskItem";
import QuickTask from "../../../../components/tasks/QuickTask";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectDetails } from "../../../../store/actions/project";
import { updateTaskStatus } from "../../../../store/actions/task";
import EditTaskModal from "../../../../components/tasks/EditTaskModal";

const ManageTasks = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { projectDetails } = useSelector((state) => state.project);
  const [clonedProjectDetails, setClonedProjectDetails] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectDetails({ id: projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    setClonedProjectDetails({ ...projectDetails });
  }, [projectDetails]);

  const handleDragEnd = (result) => {
    const clonedProject = { ...projectDetails };
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggedItem = {
      ...clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail[
        source.index
      ],
    };

    clonedProject.lstTask[source.droppableId - 1].lstTaskDeTail.splice(
      source.index,
      1
    );

    clonedProject.lstTask[destination.droppableId - 1].lstTaskDeTail.splice(
      destination.index,
      0,
      draggedItem
    );

    setClonedProjectDetails(clonedProject);

    dispatch(
      updateTaskStatus(
        {
          taskId: draggableId,
          statusId: destination.droppableId,
        },
        () => dispatch(fetchProjectDetails({ id: projectId }))
      )
    );
  };

  const handleClickTaskItem = (task) => () => {
    setSelectedTask(task);
    setShowEditTaskModal(true);
  };

  const handleCancelEditTask = () => {
    setShowEditTaskModal(false);
  };

  const handleUpdateTaskSuccess = () => {
    dispatch(fetchProjectDetails({ id: projectId }));
  };

  if (!Object.keys(clonedProjectDetails).length) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <>
      <BackButton />

      <Typography.Title>{clonedProjectDetails.projectName}</Typography.Title>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row gutter={16}>
          {clonedProjectDetails.lstTask.map((listTaskItem) => {
            return (
              <Col
                key={listTaskItem.statusId}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                lg={{ span: 6 }}
                className="mb-4"
              >
                <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
                  <TaskListTitle title={listTaskItem.statusName} />

                  <Droppable droppableId={listTaskItem.statusId}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {listTaskItem.lstTaskDeTail.map(
                          (listTaskDetailItem, index) => {
                            return (
                              <TaskItem
                                key={listTaskDetailItem.taskId}
                                index={index}
                                listTaskDetailItem={listTaskDetailItem}
                                onClick={handleClickTaskItem(
                                  listTaskDetailItem
                                )}
                              />
                            );
                          }
                        )}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  {listTaskItem.statusName === "BACKLOG" && (
                    <QuickTask projectId={projectId} />
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
      </DragDropContext>

      {selectedTask && (
        <EditTaskModal
          visible={showEditTaskModal}
          task={selectedTask}
          onCancel={handleCancelEditTask}
          onUpdateSuccess={handleUpdateTaskSuccess}
        />
      )}
    </>
  );
};

export default ManageTasks;

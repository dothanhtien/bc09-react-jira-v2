import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Spin, Typography } from "antd";
import BackButton from "../../../../components/ui/Button/BackButton";
import TaskListTitle from "../../../../components/tasks/TaskListTitle";
import TaskItem from "../../../../components/tasks/TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import { fetchProjectDetails } from "../../../../store/actions/project";

const ManageTasks = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const fetchingProjectDetailsSelector = createLoadingSelector([
    "FETCH_PROJECT_DETAILS",
  ]);
  const isFetchingProjectDetails = useSelector((state) =>
    fetchingProjectDetailsSelector(state)
  );
  const { projectDetails } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjectDetails({ id: projectId }));
  }, [dispatch, projectId]);

  if (isFetchingProjectDetails || !projectDetails) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <>
      <BackButton />

      <Typography.Title>{projectDetails.projectName}</Typography.Title>

      <Row gutter={16}>
        {projectDetails.lstTask.map((listTaskItem) => {
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

                <div className="flex-grow">
                  {listTaskItem.lstTaskDeTail.map((listTaskDetailItem) => {
                    return (
                      <TaskItem
                        key={listTaskDetailItem.taskId}
                        listTaskDetailItem={listTaskDetailItem}
                      />
                    );
                  })}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ManageTasks;

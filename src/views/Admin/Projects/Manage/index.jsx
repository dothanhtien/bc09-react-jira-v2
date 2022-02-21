import React, { useEffect } from "react";
import { Button, Space, Table, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import { fetchAllProjects } from "../../../../store/actions/project";
import { useNavigate } from "react-router-dom";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchingProjectsSelector = createLoadingSelector([
    "FETCH_ALL_PROJECTS",
  ]);
  const isFetchingProjects = useSelector((state) =>
    fetchingProjectsSelector(state)
  );
  const { projects } = useSelector((state) => state.project);

  const transformedProjects = projects.map((project) => {
    return {
      ...project,
      key: project.id,
    };
  });

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  return (
    <>
      <Typography.Title>Manage projects</Typography.Title>

      <Table
        dataSource={transformedProjects}
        locale={{ emptyText: "" }}
        loading={isFetchingProjects}
      >
        <Table.Column
          title="#"
          dataIndex="id"
          key="id"
          sorter={(a, b) => a.id - b.id}
        />
        <Table.Column
          title="Project Name"
          key="projectName"
          render={({ projectName, id }) => {
            return (
              <Button
                type="link"
                onClick={() => navigate(`/projects/${id}/board`)}
              >
                {projectName}
              </Button>
            );
          }}
          sorter={(a, b) => a.projectName.localeCompare(b.projectName)}
          width="30%"
        />
        <Table.Column
          title="Category Name"
          dataIndex="categoryName"
          key="categoryName"
          sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}
          width="15%"
        />
        <Table.Column
          title="Creator"
          key="creator"
          render={({ creator }) => <>{creator.name}</>}
          sorter={(a, b) => a.creator.name.localeCompare(b.creator.name)}
          width="15%"
        />
        <Table.Column
          title="Members"
          dataIndex="members"
          key="members"
          render={(members) =>
            members.map((member) => (
              <Tag color="blue" key={member.userId} className="mb-2">
                {member.name}
              </Tag>
            ))
          }
        />
        <Table.Column
          title="Action"
          key="action"
          align="center"
          render={({ id }) => (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => navigate(`/projects/${id}/edit`)}
              />
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => console.log("This function is coming soon!")}
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ManageProjects;

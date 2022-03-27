import React, { useEffect } from "react";
import { Button, Modal, Space, Table, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import {
  deleteProject,
  fetchAllProjects,
} from "../../../../store/actions/project";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const showConfirmDeleteProjectModal = (id, projectName) => {
    Modal.confirm({
      title: "Are you sure to delete this project?",
      content: (
        <>
          The project{" "}
          <Typography.Text type="danger">{projectName}</Typography.Text> will be
          permanently deleted.
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      centered: true,

      onOk: () => {
        handleDeleteProject(id);
      },
    });
  };

  const handleDeleteProject = (id) => {
    dispatch(
      deleteProject({ projectId: id }, () => {
        dispatch(fetchAllProjects());
        Swal.fire({
          icon: "success",
          title: "Project deleted successfully",
          showConfirmButton: false,
        });
      })
    );
  };

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
                className="whitespace-normal text-left p-0"
              >
                {projectName}
              </Button>
            );
          }}
          sorter={(a, b) => a.projectName.localeCompare(b.projectName)}
          // width="30%"
        />
        <Table.Column
          title="Category Name"
          dataIndex="categoryName"
          key="categoryName"
          sorter={(a, b) => a.categoryName.localeCompare(b.categoryName)}
          // width="15%"
        />
        <Table.Column
          title="Creator"
          key="creator"
          render={({ creator }) => <>{creator.name}</>}
          sorter={(a, b) => a.creator.name.localeCompare(b.creator.name)}
          // width="15%"
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
          render={({ id, projectName }) => (
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
                onClick={() => showConfirmDeleteProjectModal(id, projectName)}
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ManageProjects;

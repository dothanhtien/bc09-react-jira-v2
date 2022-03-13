import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import BackButton from "../../../../components/ui/Button/BackButton";
import MandatoryLabel from "../../../../components/ui/Label/Mandatory";
import ProjectCategorySelect from "../../../../components/ui/Input/ProjectCategorySelect";
import TinyMCEEditor from "../../../../components/ui/Input/TinyMCEEditor";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "../../../../services/project";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import {
  fetchProjectDetails,
  updateProject,
} from "../../../../store/actions/project";

const EditProject = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projectDetails } = useSelector((state) => state.project);
  const updatingProjectSelector = createLoadingSelector(["UPDATE_PROJECT"]);
  const isUpdatingProject = useSelector((state) =>
    updatingProjectSelector(state)
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      id: projectId,
      projectName: "",
      description: "",
      categoryId: 0,
      creator: 0,
    },
    resolver: yupResolver(createProjectSchema),
  });

  useEffect(() => {
    dispatch(fetchProjectDetails({ id: projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectDetails) {
      const {
        id,
        projectName,
        description,
        projectCategory: { id: categoryId },
        creator: { id: creator },
      } = projectDetails;

      const data = {
        id,
        projectName,
        description,
        categoryId,
        creator,
      };

      reset(data);
    }
  }, [projectDetails, reset]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      updateProject(data, () => {
        Swal.fire({
          icon: "success",
          title: "Project updated successfully",
          showConfirmButton: false,
        });
      })
    );
  };

  return (
    <>
      <BackButton />

      <Typography.Title>Edit project</Typography.Title>

      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 768 }}
      >
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <Form.Item
              label={<MandatoryLabel text="Project name" />}
              validateStatus={errors.projectName && "error"}
              help={errors.projectName?.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />

        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <ProjectCategorySelect error={errors.categoryId} field={field} />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label="Description" style={{ minHeight: 230 }}>
              <TinyMCEEditor
                value={field.value}
                onEditorChange={field.onChange}
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mr-2"
            loading={isUpdatingProject}
          >
            Update
          </Button>
          <Button
            type="default"
            className="mr-2"
            onClick={() => navigate(`/projects/${projectId}/members`)}
            disabled={isUpdatingProject}
          >
            Manage members
          </Button>
          <Button
            type="default"
            onClick={() => reset()}
            disabled={isUpdatingProject}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProject;

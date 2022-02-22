import React, { useEffect } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "../../../../services/project";
import { useDispatch, useSelector } from "react-redux";
import {
  createErrorMessageSelector,
  createLoadingSelector,
} from "../../../../store/selector";
import {
  createProjectAuthorize,
  fetchProjectCategories,
} from "../../../../store/actions/project";
import MandatoryLabel from "../../../../components/ui/Label/Mandatory";
import TinyMCEEditor from "../../../../components/ui/Input/TinyMCEEditor";

const NewProject = () => {
  const dispatch = useDispatch();
  const fetchingProjectCategoriesSelector = createLoadingSelector([
    "FETCH_PROJECT_CATEGORIES",
  ]);
  const creatingProjectSelector = createLoadingSelector(["CREATE_PROJECT"]);
  const isFetchingProjectCategories = useSelector((state) =>
    fetchingProjectCategoriesSelector(state)
  );
  const createProjectErrorMessageSelector = createErrorMessageSelector([
    "CREATE_PROJECT",
  ]);
  const isCreatingProject = useSelector((state) =>
    creatingProjectSelector(state)
  );
  const createProjectErrorMessage = useSelector((state) =>
    createProjectErrorMessageSelector(state)
  );
  const { projectCategories } = useSelector((state) => state.project);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: 0,
    },
    resolver: yupResolver(createProjectSchema),
  });

  useEffect(() => {
    dispatch(fetchProjectCategories);
  }, [dispatch]);

  useEffect(() => {
    if (createProjectErrorMessage === "Project name already exists") {
      setError("projectName", {
        type: "manual",
        message: createProjectErrorMessage,
      });
    }
  }, [createProjectErrorMessage, setError]);

  const onSubmit = (data) => {
    dispatch(
      createProjectAuthorize(data, () => {
        Swal.fire({
          icon: "success",
          title: "Project created successfully",
          showConfirmButton: false,
        });
        reset();
      })
    );
  };

  return (
    <>
      <Typography.Title>New project</Typography.Title>

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
            <Form.Item
              label={<MandatoryLabel text="Project category" />}
              validateStatus={errors.categoryId && "error"}
              help={errors.categoryId?.message}
            >
              <Select
                {...field}
                placeholder="Select a option and change input text above"
                disabled={isFetchingProjectCategories}
              >
                <Select.Option value={0}>
                  Select a project category
                </Select.Option>
                {projectCategories.map(({ id, projectCategoryName }) => {
                  return (
                    <Select.Option key={id} value={id}>
                      {projectCategoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
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
            className="mr-4"
            loading={isCreatingProject}
          >
            Create
          </Button>
          <Button
            type="default"
            onClick={() => reset()}
            disabled={isCreatingProject}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewProject;

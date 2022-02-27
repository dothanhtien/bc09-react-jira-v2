import React, { useEffect } from "react";
import { Form, Select } from "antd";
import MandatoryLabel from "../../Label/Mandatory";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../../store/selector";
import { fetchProjectCategories } from "../../../../store/actions/project";

const ProjectCategorySelect = ({ error, field }) => {
  const dispatch = useDispatch();
  const fetchingProjectCategoriesSelector = createLoadingSelector([
    "FETCH_PROJECT_CATEGORIES",
  ]);
  const isFetchingProjectCategories = useSelector((state) =>
    fetchingProjectCategoriesSelector(state)
  );
  const { projectCategories } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjectCategories);
  }, [dispatch]);

  return (
    <Form.Item
      label={<MandatoryLabel text="Project category" />}
      validateStatus={error && "error"}
      help={error?.message}
    >
      <Select
        {...field}
        placeholder="Select a option and change input text above"
        disabled={isFetchingProjectCategories}
      >
        <Select.Option value={0}>Select a project category</Select.Option>
        {projectCategories.map(({ id, projectCategoryName }) => {
          return (
            <Select.Option key={id} value={id}>
              {projectCategoryName}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default ProjectCategorySelect;

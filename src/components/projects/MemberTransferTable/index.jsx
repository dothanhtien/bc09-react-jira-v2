import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLoadingSelector } from "../../../store/selector";
import { fetchUsers } from "../../../store/actions/user";
import {
  assignUserToProject,
  fetchProjectMembers,
  removeUserFromProject,
} from "../../../store/actions/project";
import TransferTable from "./TransferTable";

const leftTableColumns = [
  {
    dataIndex: "userId",
    title: "ID",
  },
  {
    dataIndex: "name",
    title: "Name",
  },
];
const rightTableColumns = [
  {
    dataIndex: "userId",
    title: "ID",
  },
  {
    dataIndex: "name",
    title: "Name",
  },
];

const MemberTransferTable = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const fetchingUsersAndProjectMembersSelector = createLoadingSelector([
    "FETCH_USERS",
    "FETCH_PROJECT_MEMBERS",
  ]);
  const isFetchingUsersAndProjectMembers = useSelector((state) =>
    fetchingUsersAndProjectMembersSelector(state)
  );
  const { userList } = useSelector((state) => state.user);
  const { projectMembers } = useSelector((state) => state.project);
  const [dataSource, setDataSource] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjectMembers(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    const transformedUsers = userList.map((user) => {
      return {
        ...user,
        key: user.userId.toString(),
      };
    });

    setDataSource(transformedUsers);
  }, [userList]);

  useEffect(() => {
    const transformedProjectMembers = projectMembers.map((member) =>
      member.userId.toString()
    );

    setTargetKeys(transformedProjectMembers);
  }, [projectMembers]);

  const onChange = (targetKeys, direction, moveKeys) => {
    if (direction === "right") {
      dispatch(
        assignUserToProject({ projectId, userId: moveKeys[0] }, () => {
          dispatch(fetchUsers());
          dispatch(fetchProjectMembers(projectId));
        })
      );
    }

    if (direction === "left") {
      dispatch(
        removeUserFromProject({ projectId, userId: moveKeys[0] }, () => {
          dispatch(fetchUsers());
          dispatch(fetchProjectMembers(projectId));
        })
      );
    }
  };

  return (
    <>
      {projectMembers && (
        <TransferTable
          dataSource={dataSource}
          targetKeys={targetKeys}
          // disabled={true}
          loading={isFetchingUsersAndProjectMembers}
          showSearch={true}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.name.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
          showSelectAll={false}
        />
      )}
    </>
  );
};

export default MemberTransferTable;

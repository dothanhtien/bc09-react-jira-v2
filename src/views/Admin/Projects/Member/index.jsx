import React from "react";
import { Typography } from "antd";
import BackButton from "../../../../components/ui/Button/BackButton";
import MemberTransferTable from "../../../../components/projects/MemberTransferTable";

const ProjectMembers = () => {
  return (
    <>
      <BackButton />

      <Typography.Title>Manage members</Typography.Title>

      <MemberTransferTable />
    </>
  );
};

export default ProjectMembers;

import React from "react";
import { Typography } from "antd";

const MandatoryLabel = ({ text }) => {
  return (
    <Typography.Text>
      {text} <span className="text-red-700">*</span>
    </Typography.Text>
  );
};

export default MandatoryLabel;

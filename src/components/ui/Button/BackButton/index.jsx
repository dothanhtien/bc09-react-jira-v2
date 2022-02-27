import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="link"
      icon={<ArrowLeftOutlined />}
      className="px-0 mb-3"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;

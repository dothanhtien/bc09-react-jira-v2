import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <Layout.Content className="bg-white p-6 my-6 mx-6">
      <Outlet />
    </Layout.Content>
  );
};

export default Content;

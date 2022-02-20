import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hideLogoText, setHideLogoText] = useState(false);

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
    setHideLogoText((hideLogoText) => !hideLogoText);
  };

  return (
    <Layout className="h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        hideLogoText={hideLogoText}
        setHideLogoText={setHideLogoText}
      />

      <Layout className="site-layout">
        <Header collapsed={collapsed} toggle={toggle} />

        <Content />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

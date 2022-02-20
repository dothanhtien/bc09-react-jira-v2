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
    <Layout className="min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        hideLogoText={hideLogoText}
        setHideLogoText={setHideLogoText}
      />

      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s ease",
        }}
      >
        <Header collapsed={collapsed} toggle={toggle} />

        <Content />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

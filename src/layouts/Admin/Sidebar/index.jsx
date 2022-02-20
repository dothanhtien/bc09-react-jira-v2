import React from "react";
import { Layout, Menu } from "antd";
import { ProjectOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LogoImage from "../../../assets/images/logo.jpeg";

const Sidebar = ({
  collapsed,
  setCollapsed,
  hideLogoText,
  setHideLogoText,
}) => {
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
        setHideLogoText(broken);
      }}
      className="overflow-auto h-screen fixed left-0 top-0 bottom-0"
    >
      <div className="h-16 flex justify-start items-center">
        <img className="h-full" src={LogoImage} alt="Test" />
        {!hideLogoText && (
          <span>
            <strong>Cyber Bug</strong>
          </span>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="border-r-0"
      >
        <Menu.SubMenu key="1" icon={<ProjectOutlined />} title="Projects">
          <Menu.Item key="3">
            Manage
            <Link to="/projects" />
          </Menu.Item>
          <Menu.Item key="4">
            New
            <Link to="/projects/new" />
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="2" icon={<UserOutlined />} title="Users">
          <Menu.Item key="5">
            Manage
            <Link to="/users" />
          </Menu.Item>
          <Menu.Item key="6">
            New
            <Link to="/users/new" />
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;

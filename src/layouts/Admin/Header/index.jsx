import React from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAction } from "../../../store/actions";
import { actionType } from "../../../store/actions/type";
import { ACCESS_TOKEN } from "../../../utils/constants/appConfig";

const Header = ({ collapsed, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(createAction(actionType.SIGN_IN_SUCCESS, null));
    navigate("/sign-in");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="myProfile" className="px-6">
        {/* My profile */}
        <Link to="/my-profile">My profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="signOut" className="px-6" onClick={handleSignOut}>
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className="bg-white" style={{ padding: 0 }}>
      <div className="h-full flex justify-between items-center px-6">
        <Button onClick={toggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Tooltip placement="right" title="Your profile and settings">
            <Button shape="circle" className="flex justify-center items-center">
              <Avatar
                size={30}
                src="https://ui-avatars.com/api/?name=Tien Do"
              />
            </Button>
          </Tooltip>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;

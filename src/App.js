import React from "react";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1 className="text-2xl text-red-700 font-semibold text-center bg-slate-400 py-5">
        CyberBug
      </h1>
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          className="mr-2"
        />
      </Tooltip>
      <Button type="primary" shape="circle" className="mr-2">
        A
      </Button>
      <Button type="primary" icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} className="mr-2" />
      </Tooltip>
      <Button icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search">
        <Button shape="circle" icon={<SearchOutlined />} className="mr-2" />
      </Tooltip>
      <Button icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Tooltip title="search">
        <Button
          type="dashed"
          shape="circle"
          icon={<SearchOutlined />}
          className="mr-2"
        />
      </Tooltip>
      <Button type="dashed" icon={<SearchOutlined />} className="mr-2">
        Search
      </Button>
      <Button
        icon={<SearchOutlined />}
        href="https://www.google.com"
        className="mr-2"
      />
    </div>
  );
};

export default App;

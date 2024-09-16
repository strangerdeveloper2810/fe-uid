import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import type { CSSProperties } from "react";

const Loading: React.FC = () => {
  const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};

export default Loading;

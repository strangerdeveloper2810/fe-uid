import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface ItemsTabsProps {
  items: TabsProps["items"];
}

const Navigation: React.FC<ItemsTabsProps> = ({ items }) => {
  const navigate = useNavigate();

  // Handle tab change to navigate to the selected route
  const handleChange = (key: string) => {
    navigate(key);
  };

  return <Tabs defaultActiveKey="/" onChange={handleChange} items={items} />;
};

export default Navigation;

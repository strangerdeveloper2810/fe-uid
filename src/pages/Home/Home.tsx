import React from "react";
import Navigation from "../../components/Navigation";
import type { TabsProps } from "antd";
// Define the tab items
const items: TabsProps["items"] = [
  {
    key: "/",
    label: "Home",
    children: "",
  },
  {
    key: "/create-product",
    label: "Create Product",
    children: "",
  },
  {
    key: "/products",
    label: "Product List",
    children: "",
  },
];
const Home: React.FC = () => {
  return (
    <>
      <Navigation items={items} />
      Home page
    </>
  );
};

export default Home;

import React, { lazy } from "react";
interface RoutesType {
  title: string;
  path: string;
  element: React.ReactElement;
}
//Lazy component
const HomeLazy = lazy(() => import("../pages/Home"));
const NotFoundLazy = lazy(() => import("../pages/NotFound"));
const CreateProductLazy = lazy(
  () => import("../pages/Products/create-product")
);
const ProductListLazy = lazy(() => import("../pages/Products"));
const routes: RoutesType[] = [
  {
    title: "Home",
    path: "/",
    element: <HomeLazy />,
  },
  {
    title: "Create Product",
    path: "/create-product",
    element: <CreateProductLazy />,
  },
  {
    title: "Product List",
    path: "/products",
    element: <ProductListLazy />,
  },
  {
    title: "404 Not Found",
    path: "*",
    element: <NotFoundLazy />,
  },
];

export default routes;

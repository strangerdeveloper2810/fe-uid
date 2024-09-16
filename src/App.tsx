import map from "lodash/map";
import get from "lodash/get";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import CenteredLayout from "./Layouts/CenteredLayout";
import routes from "./router";

const App: React.FC = () => {
  return (
    <CenteredLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          {map(routes, (route) => (
            <Route
              path={get(route, "path")}
              element={get(route, "element")}
              key={get(route, "title")}
            />
          ))}
        </Routes>
      </Suspense>
    </CenteredLayout>
  );
};

export default App;

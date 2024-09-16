import React from "react";
import { Spin } from "antd";

interface WithLoadingIndicatorProps {
  loading: boolean;
}

const withLoadingIndicator = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingIndicatorProps> => {
  return ({ loading, ...props }: WithLoadingIndicatorProps) => {
    if (loading) {
      return <Spin tip="Loading..." />;
    }
    return <WrappedComponent {...(props as P)} />;
  };
};

export default withLoadingIndicator;

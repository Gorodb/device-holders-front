import {FunctionComponent} from "react";
import {AdminLayout} from "../components/layout";

export const withAdminLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function WithLayoutComponent(props: T): JSX.Element {
    return (
      <AdminLayout>
        <Component {...props} />
      </AdminLayout>
    );
  };
};

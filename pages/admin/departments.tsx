import {withAdminLayout} from "../../app/hoc";
import {DepartmentsList} from "../../app/components/admin/departmentsList";

const Users = (): JSX.Element => {
  return (
    <div>
      <DepartmentsList />
    </div>
  )
}

export default withAdminLayout(Users);

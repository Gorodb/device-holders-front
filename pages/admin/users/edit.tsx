import {withAdminLayout} from "../../../app/hoc";
import UsersPage from "../../../app/components/admin/usersList";

const Users = (): JSX.Element => {

  return (
    <div>
      <UsersPage />
    </div>
  )
}

export default withAdminLayout(Users);

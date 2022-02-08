import {withAdminLayout} from "../../app/hoc";
import {UsersList} from "../../app/components/admin/usersList";

const Users = (): JSX.Element => {
  return (
    <div>
      <UsersList />
    </div>
  )
}

export default withAdminLayout(Users);

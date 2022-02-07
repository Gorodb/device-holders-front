import {withAdminLayout} from "../app/hoc";

const Admin = (): JSX.Element => {
  return (
    <div>Админ панель</div>
  )
}

export default withAdminLayout(Admin);

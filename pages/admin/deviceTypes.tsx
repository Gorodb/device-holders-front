import {withAdminLayout} from "../../app/hoc";
import {DeviceTypesList} from "../../app/components/admin/deviceTypesList";

const Users = (): JSX.Element => {
  return (
    <div>
      <DeviceTypesList />
    </div>
  )
}

export default withAdminLayout(Users);

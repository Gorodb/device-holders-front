import {withAdminLayout} from "../../app/hoc";
import {DevicesList} from "../../app/components/admin/devicesList";

const Users = (): JSX.Element => {
  return (
    <div>
      <DevicesList />
    </div>
  )
}

export default withAdminLayout(Users);

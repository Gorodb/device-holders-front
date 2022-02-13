import {withAdminLayout} from "../../../app/hoc";

import {useRouter} from "next/router";
import {DeviceTypePage} from "../../../app/components/admin/deviceTypePage";

const Users = (): JSX.Element => {
  const router = useRouter()

  return (
    <div>
      {router.query.id && typeof router.query.id === 'string' && <DeviceTypePage id={router.query.id}/>}
    </div>
  )
}

export default withAdminLayout(Users);

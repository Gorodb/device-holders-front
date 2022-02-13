import {withAdminLayout} from "../../../app/hoc";

import {useRouter} from "next/router";
import {DevicePage} from "../../../app/components/admin/devicePage";

const Users = (): JSX.Element => {
  const router = useRouter()

  return (
    <div>
      {router.query.id && typeof router.query.id === 'string' && <DevicePage id={router.query.id}/>}
    </div>
  )
}

export default withAdminLayout(Users);

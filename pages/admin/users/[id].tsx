import {withAdminLayout} from "../../../app/hoc";

import {useRouter} from "next/router";
import {UserPage} from "../../../app/components/admin/userPage";

const Users = (): JSX.Element => {
  const router = useRouter()

  return (
    <div>
      {router.query.id && typeof router.query.id === 'string' && <UserPage id={router.query.id}/>}
    </div>
  )
}

export default withAdminLayout(Users);

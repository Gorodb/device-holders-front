import {withAdminLayout} from "../../../app/hoc";

import {useRouter} from "next/router";
import {DepartmentPage} from "../../../app/components/admin/departmentPage";

const Users = (): JSX.Element => {
  const router = useRouter()

  return (
    <div>
      {router.query.id && typeof router.query.id === 'string' && <DepartmentPage id={router.query.id}/>}
    </div>
  )
}

export default withAdminLayout(Users);

import {ForgotPassword} from "../app/components/authorisation";
import {withLayout, withCloseForAuth} from "../app/hoc";
import compose from "../app/utils/compose";

const Registration = (): JSX.Element => {
  return <ForgotPassword />
}


export default compose(withCloseForAuth, withLayout)(Registration)

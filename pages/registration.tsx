import {Registration} from "../app/components/authorisation";
import {withLayout, withCloseForAuth} from "../app/hoc";
import compose from "../app/utils/compose";

const Auth = (): JSX.Element => {
  return <Registration />
}

export default compose(withCloseForAuth, withLayout)(Auth);

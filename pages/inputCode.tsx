import {InputCode} from "../app/components/authorisation";
import {withLayout, withCloseForAuth} from "../app/hoc";
import compose from "../app/utils/compose";

const Auth = (): JSX.Element => {
  return <InputCode />
}

export default compose(withCloseForAuth)(Auth);

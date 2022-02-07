import {Authorisation} from "../app/components/authorisation";
import {withLayout} from "../app/hoc";

const Auth = (): JSX.Element => {
  return <Authorisation />
}

export default withLayout(Auth);

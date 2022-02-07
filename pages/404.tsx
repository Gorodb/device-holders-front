import {withLayout} from "../app/hoc";

const Custom404 = (): JSX.Element => {
  return <h1>404 - Page Not Found</h1>
}

export default withLayout(Custom404)

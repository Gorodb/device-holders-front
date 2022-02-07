import {withLayout} from "../app/hoc";

const Custom500 = (): JSX.Element => {
  return <h1>Упс, кажется что-то пошло не так</h1>
}

export default withLayout(Custom500)

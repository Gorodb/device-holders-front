import type { NextPage } from 'next'
import DevicesList from "../app/components/devicesList";
import {withLayout} from "../app/hoc";

const Home: NextPage = (): JSX.Element => {
  return (
    <div>
        <DevicesList />
    </div>
  )
}

export default withLayout(Home)

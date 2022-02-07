import {FunctionComponent, useEffect} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useRouter} from "next/router";

export const withIsAuth = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function WithIsAuth(props: T): JSX.Element {
    const isAuth = useTypedSelector(store => store.auth.isAuth)
    const router = useRouter()

    useEffect(() => {
      if (!isAuth) {
        router.push('/')
      }
    }, [isAuth, router])

    return <Component {...props} />
  };
};

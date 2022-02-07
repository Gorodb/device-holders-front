import {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

import {useActions} from "./useActions";
import {CookiesEnum} from "../enums/cookies.enum";
import {useTypedSelector} from "./useTypedSelector";

type returnState = [isAuth: boolean, deleteAccessToken: any, accessToken: string | undefined]

export const useAuthorisation = (): returnState => {
  const [accessToken, setAccessToken] = useState<string | undefined>('');
  const { setIsAuth, setIsAdmin, setUser } = useActions();
  const isAuth = useTypedSelector(state => state.auth.isAuth)
  const router = useRouter()

  useEffect(() => {
    const tokenFromCookies = Cookies.get(CookiesEnum.authorisation)
    if (tokenFromCookies) {
      setAccessToken(tokenFromCookies);
      setIsAuth(true);
    }
  }, [setIsAuth])

  const deleteAccessToken = useCallback(() => {
    Cookies.remove(CookiesEnum.authorisation)
    setIsAdmin(false)
    setIsAuth(false);
    setUser({email: ''})
    router.push('/')
  }, [router, setIsAdmin, setIsAuth, setUser])

  return [isAuth, deleteAccessToken, accessToken]
}

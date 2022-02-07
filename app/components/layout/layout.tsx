import {useEffect} from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

import {LayoutProps} from "./layout.props";
import styles from './layout.module.scss';
import Header from "./header";
import Footer from "./footer";
import {useActions} from "../../hooks/useActions";
import {useUserInfoMutation} from "../../store/auth/auth.api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../types/auth.types";
import {CookiesEnum} from "../../enums/cookies.enum";
import {UserRoleEnum} from "../../enums/userRole.enum";

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [getUserInfo, {data, isSuccess}] = useUserInfoMutation()
  const { setUser, setIsAuth, setIsAdmin } = useActions()
  const isAdmin = useTypedSelector(store => store.auth.isAdmin)
  const {id}: IUser = useTypedSelector(store => store.auth.user)
  const router = useRouter()

  useEffect(() => {
    const isAuthToken = !!Cookies.get(CookiesEnum.authorisation)
    if (!id && isAuthToken) {
      getUserInfo('')
    }
    setIsAuth(isAuthToken)
  }, [getUserInfo, id, setIsAuth])

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
      setIsAdmin(data.role === UserRoleEnum.admin)
    }
  }, [data, isSuccess, setIsAdmin, setUser])

  useEffect(() => {
    const departmentFromCookies = Cookies.get(CookiesEnum.department)
    if (!departmentFromCookies) {
      router.push('/changeRegion')
    }
  }, [router])

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} isAdmin={isAdmin} />
      <main className={styles.body}>{children}</main>
      <Footer className={styles.footer} />
    </div>
  );
};

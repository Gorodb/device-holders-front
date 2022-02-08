import {useEffect} from "react";
import {useRouter} from "next/router";
import Cookies from "js-cookie";

import {LayoutProps} from "./layout.props";
import styles from './adminLayout.module.scss';
import Footer from "./footer";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";
import {useActions} from "../../hooks/useActions";
import {useUserInfoMutation} from "../../store/auth/auth.api";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../types/auth.types";
import {CookiesEnum} from "../../enums/cookies.enum";
import {UserRoleEnum} from "../../enums/userRole.enum";
import Breadcrumbs from "../breadcrumbs";
import {Modal} from "../modal";

export const AdminLayout = ({ children }: LayoutProps): JSX.Element => {
  const router = useRouter();
  const {setUser, setIsAdmin} = useActions()
  const {id}: IUser = useTypedSelector(store => store.auth.user)
  const breadcrumbs = useTypedSelector((state) => state.breadcrumbs.breadcrumbs)
  const [getUserInfo, {data, isSuccess, isLoading, status}] = useUserInfoMutation()

  useEffect(() => {
    const isAuthToken = !!Cookies.get(CookiesEnum.authorisation)
    if (!id && isAuthToken) {
      getUserInfo('')
    } else if (!isAuthToken) {
      router.push('/auth')
    }
  }, [getUserInfo, id, router])

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)

      if (data.role !== UserRoleEnum.admin) {
          router.push('/')
      } else {
        setIsAdmin(true)
      }
    }
  }, [data, isSuccess, router, setIsAdmin, setUser])

  useEffect(() => {
    if (status === 'fulfilled' && data && data.role !== UserRoleEnum.admin) {
      router.push('/')
    }
  }, [data, router, status])

  return (
    <div className={styles.wrapper}>
      <Modal />
      <AdminHeader className={styles.header}>
        <Breadcrumbs path={breadcrumbs} />
      </AdminHeader>
      <AdminSidebar className={styles.sidebar} />
      <div className={styles.content}>
        <main className={styles.body}>{children}</main>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

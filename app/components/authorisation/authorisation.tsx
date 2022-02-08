import {ChangeEvent, useEffect, useState} from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import {useRouter} from "next/router";

import styles from './authorisation.module.scss';
import {Input, Span, SpanSizeEnum, ButtonTypes, Button} from "../htmlTags";
import {useAuthMutation} from "../../store/auth/auth.api";
import {CircleLoader, CircleTypes} from '../loaders';
import {useActions} from "../../hooks/useActions";

interface IInitialProps {
  email: string;
  password: string;
}

export const Authorisation = (): JSX.Element => {
  const initialState: IInitialProps = {email: '', password: ''};
  const isAuth: boolean = !!Cookies.get('authorisation')
  const [authCredentials, setAuthCredentials] = useState<IInitialProps>(initialState);
  const [authUser, {error, isError, isLoading, isSuccess}] = useAuthMutation()
  const router = useRouter()
  const {setIsAuth} = useActions()

  useEffect(() => {
    if (isSuccess || isAuth) {
      setIsAuth(true)
      router.push('/')
    }
  }, [setIsAuth, isAuth, isSuccess, router])

  const onSubmit = (event: ChangeEvent): void => {
    event.preventDefault();
    authUser(authCredentials);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthCredentials({
      ...authCredentials,
      [event.target.name]: event.target.value
    })
  }

  const errorMessage: JSX.Element = (
    // @ts-ignore
    <span className={styles.errorMessage}>{error && error.data.message}</span>
  )

  const disabledButton = <Button
    isDisabled={true}
    buttonType={ButtonTypes.black}
    isFullSize={true}>
    {isLoading ? <CircleLoader type={CircleTypes.light} /> : 'Войти'}
  </Button>

  const button = authCredentials.password && authCredentials.email
    ? <Button onClick={onSubmit} buttonType={ButtonTypes.black} isFullSize={true}>Войти</Button>
    : disabledButton

  return (<div className={styles.authForm}>
    <div className={styles.title}>
      <Span className={styles.title} size={SpanSizeEnum.large}>Авторизация</Span>
    </div>
    <form>
      <Input name='email' type='text' onChange={onChange} label='Email'/>
      <Input name='password' type='password' onChange={onChange} label='Пароль'/>
      <Link href='/forgotPassword'><a className={styles.forgotPassword}>Напомнить пароль</a></Link>
      {button}
      { isError && errorMessage }
      <div className={styles.regBlock}>
        <Span size={SpanSizeEnum.small}>
          Ещё нет профиля?
          <Link href='/registration'><a className={styles.regLink}>Зарегистрируйтесь</a></Link>
        </Span>
      </div>
    </form>
  </div>)
}

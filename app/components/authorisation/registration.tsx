import {ChangeEvent, useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

import styles from './authorisation.module.scss';
import {Button, ButtonTypes, Span, SpanSizeEnum, Input} from "../htmlTags";
import {useDepartment} from "../../hooks/useDepartment";
import {useRegistrationMutation} from "../../store/auth/auth.api";
import {useActions} from "../../hooks/useActions";

interface IInitialProps {
  email: string;
  password: string;
  passwordAgain: string;
}

export const Registration = (): JSX.Element => {
  const initialState: IInitialProps = useMemo(() => ({email: '', password: '', passwordAgain: ''}), []);
  const [authCredentials, setAuthCredentials] = useState<IInitialProps>(initialState);
  const {email, password, passwordAgain} = authCredentials;
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const department = useDepartment();
  const [regUser, {error, isError, isLoading, isSuccess, reset}] = useRegistrationMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
  const { setUser } = useActions()
  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      setUser({ email })
      localStorage.setItem('email', email);
      router.push('/inputCode')
    }
  }, [email, isSuccess, router, setUser])

  useEffect(() => {
    const emailRegExp = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const isValidEmail = email.match(emailRegExp);
    if (!password || !passwordAgain || !isValidEmail || isLoading) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [email, isLoading, password, passwordAgain])

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      const errorMessage = error.data.message
      Array.isArray(errorMessage) ? setErrors(errorMessage) : setErrors([errorMessage])
    }
  }, [error, isError])

  const onSubmit = (event: ChangeEvent): void => {
    event.preventDefault();
    if (password !== passwordAgain) {
      setIsPasswordMatch(false)
    } else {
      if (!errors.length && department) {
        setIsPasswordMatch(true)
        regUser({email, password, department})
      }
    }
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    reset()
    setErrors([])
    setAuthCredentials({
      ...authCredentials,
      [event.target.name]: event.target.value
    })
  }

  const errorMessage = errors && errors.map((e, i) => <div key={i} className={styles.errorMessage}>{e}</div>)

  return (
    <div>
      <div className={styles.authForm}>
        <div className={styles.title}><Span className={styles.title} size={SpanSizeEnum.large}>Регистрация</Span></div>
        <form className={styles.form}>
          <Input placeholder='Введите email' name='email' type='text' onChange={onChange} label='Email'/>
          <Input placeholder='Введите пароль' name='password' type='password' onChange={onChange} label='Пароль'/>
          <Input placeholder='Введите пароль еще раз' name='passwordAgain' type='password' onChange={onChange}
                 label='Пароль еще раз'/>
          {errorMessage}
          {!isPasswordMatch && <div className={styles.errorMessage}>Пароли не совпадают</div>}
          <Button onClick={onSubmit} buttonType={ButtonTypes.black} isFullSize={true}
                  isDisabled={isDisabled}>Зарегистрироваться</Button>
          <div className={styles.regBlock}>
            <Span size={SpanSizeEnum.small}>
              Уже зарегистрирован?
              <Link href='/auth'><a className={styles.regLink}>Авторизация</a></Link>
            </Span>
          </div>
        </form>
      </div>
    </div>
  )
}

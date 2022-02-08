import Link from "next/link";
import styles from './authorisation.module.scss';
import {ChangeEvent, useState} from "react";
import {Input, SpanSizeEnum, Span, Button, ButtonTypes} from "../htmlTags";

export const ForgotPassword = (): JSX.Element => {
  const initialState = {email: ''};
  const [authCredentials, setAuthCredentials] = useState<{ email: string }>(initialState);

  const onSubmit = (event: ChangeEvent): void => {
    event.preventDefault();
    console.log(authCredentials)
  }


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthCredentials({
      ...authCredentials,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      <div className={styles.authForm}>
        <div className={styles.title}><Span className={styles.title} size={SpanSizeEnum.large}>Восстановления пароля</Span></div>
        <form action="">
          <Input name='email' type='text' onChange={onChange} label='Email'/>
          <Button onClick={onSubmit} buttonType={ButtonTypes.black} isFullSize={true}>Восстановить пароль</Button>
          <div className={styles.regBlock}>
            <Span size={SpanSizeEnum.small}>
              Вспомнил пароль?
              <Link href='/auth'><a className={styles.regLink}>Авторизация</a></Link>
            </Span>
            <Span size={SpanSizeEnum.small}>
              Нет аккаунта?
              <Link href='/registration'><a className={styles.regLink}>Регистрация</a></Link>
            </Span>
          </div>
        </form>
      </div>
    </div>
  )
}

import styles from './authorisation.module.scss';
import {ChangeEvent, useEffect, useState} from "react";
import {ButtonTypes, Input, Button, Span, SpanSizeEnum} from "../htmlTags";
import {InputCodeProps} from "./props/inputCode.props";
import {useResendCodeMutation, useValidateCodeMutation} from "../../store/auth/auth.api";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {CookiesEnum} from "../../enums/cookies.enum";
import {ActionsEnum} from "../../enums/actions.enum";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export const InputCode = ({ action }: InputCodeProps): JSX.Element => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [validateCode, {error, isError, isLoading, isSuccess, reset}] = useValidateCodeMutation();
  const [resendCode] = useResendCodeMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [code, setCode] = useState<string>();
  const {email} = useTypedSelector(state => state.auth.user)
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !code) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [code, isLoading])

  useEffect(() => {
    if (isSuccess) {
      Cookies.remove(CookiesEnum.accessToken)
      router.push('/')
    }
  }, [isSuccess, router])

  useEffect(() => {
    if (isError && error) {
      // @ts-ignore
      const errorMessage = error.data.message
      Array.isArray(errorMessage) ? setErrors(errorMessage) : setErrors([errorMessage])
    }
  }, [error, isError])

  const onSubmit = (event: ChangeEvent): void => {
    event.preventDefault();
    if (code) {
      validateCode({code: parseInt(code), action: ActionsEnum.registration})
    }
  }

  const onResendCodeHandle = () => {
    resendCode({
      email,
      action: ActionsEnum.registration
    })
    reset()
    setErrors([])
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    reset()
    setErrors([])
    setCode(event.target.value)
  }

  const errorMessage = errors && <Span size={SpanSizeEnum.medium} className={styles.errorMessage}>
    {errors.map((e, i) => <div key={i}>{e}</div>)}
  </Span>

  const title = 'Завершение регистрации'
  const subtitle = 'Для завершения регистрации введите код письма'
  const buttonText = 'Завершить регистрацию'

  return (
    <div className={styles.codeBlock}>
      <div className={styles.authForm}>
        <div className={styles.title}><Span className={styles.title} size={SpanSizeEnum.large}>{title}</Span></div>
        <div className={styles.title}><Span className={styles.title} size={SpanSizeEnum.medium}>{subtitle}</Span></div>
        <form action="">
          <Input name='code' type='text' onChange={onChange} label='Введите код из письма' placeholder='Введите код из письма'/>
          {errorMessage}
          <Button onClick={onSubmit} buttonType={ButtonTypes.black} isDisabled={isDisabled} isFullSize={true}>{buttonText}</Button>
          <Span size={SpanSizeEnum.small} className={styles.resend} onClick={onResendCodeHandle}>Отправить код повторно</Span>
        </form>
      </div>
    </div>
  )
}

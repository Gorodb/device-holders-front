import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import cn from 'classnames';

import {InputProps} from "./input.props";
import {Span, SpanSizeEnum} from "../span";
import styles from './input.module.scss'

export const Input = ({inputRef, label, ...props}: InputProps): JSX.Element => {
  const [shown, setShown] = useState<boolean>(false);

  const onShowClickHandler = () => {
    setShown(!shown)
  }

  const eye = shown
    ? <FiEyeOff className={styles.icon} onClick={onShowClickHandler}/>
    : <FiEye className={styles.icon} onClick={onShowClickHandler}/>

  const input = props.type === 'password'
    ? (
      <span className={styles.passwordInputBlock}>
        <input
          {...props}
          ref={inputRef}
          type={shown ? "text" : "password"}
          className={cn(styles.input, styles.passwordInput)} />
        {eye}
      </span>
    ) : <input ref={inputRef} {...props}  className={styles.input} />

  return (
    <div className={styles.container}>
      {label && <Span size={SpanSizeEnum.medium}><label className={styles.label}>{label}</label></Span>}
      {input}
    </div>
  )
}

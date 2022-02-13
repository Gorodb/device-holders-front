import {useState} from "react";
import cn from 'classnames';

import {InputProps} from "./input.props";
import {Span, SpanSizeEnum} from "../span";
import styles from './input.module.scss'

export const Input = ({inputRef, value, onClear, label, ...props}: InputProps): JSX.Element => {
  const [shown, setShown] = useState<boolean>(false);

  const onShowClickHandler = () => {
    setShown(!shown)
  }

  const eye = !shown
    ? <i className={cn(styles.icon, styles.open)} onClick={onShowClickHandler} />
    : <i className={cn(styles.icon, styles.close)} onClick={onShowClickHandler} />

  const input = props.type === 'password'
    ? (
      <span className={styles.passwordInputBlock}>
        <input
          value={value}
          {...props}
          ref={inputRef}
          type={shown ? "text" : "password"}
          className={cn(styles.input, styles.passwordInput)} />
        {eye}
      </span>
    ) : (
      <div className={styles.inputContainer}>
        <input value={value} ref={inputRef} {...props} className={styles.input} />
        {onClear && value && <i className={styles.clearIcon} onClick={onClear}/>}
      </div>
    )

  return (
    <div className={styles.container}>
      {label && <Span size={SpanSizeEnum.medium}><label className={styles.label}>{label}</label></Span>}
      {input}
    </div>
  )
}

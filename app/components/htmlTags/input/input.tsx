import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import cn from 'classnames';

import {InputProps} from "./input.props";
import {Span, SpanSizeEnum} from "../span";
import styles from './input.module.scss'
import {FaTimes} from "react-icons/fa";

export const Input = ({inputRef, value, onClear, label, ...props}: InputProps): JSX.Element => {
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
        {onClear && value && <FaTimes className={styles.clearIcon} onClick={onClear}/>}
      </div>
    )

  return (
    <div className={styles.container}>
      {label && <Span size={SpanSizeEnum.medium}><label className={styles.label}>{label}</label></Span>}
      {input}
    </div>
  )
}

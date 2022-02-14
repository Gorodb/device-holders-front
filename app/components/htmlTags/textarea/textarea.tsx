import {TextareaProps} from "./textarea.props";
import {Span, SpanSizeEnum} from "../span";
import styles from './textarea.module.scss'

export const Textarea = ({inputRef, children, isRequired, requiredText, label, ...props}: TextareaProps): JSX.Element => {
  const textarea = (
    <textarea ref={inputRef} className={styles.textarea} {...props} />
  )

  return (
    <div className={styles.container}>
      {label && <Span size={SpanSizeEnum.medium}><label className={styles.label}>{label}</label></Span>}
      {textarea}
      {isRequired && !props.value && <span className={styles.requiredInfo}>{requiredText || "Обязательное поле"}</span>}
    </div>
  )
}

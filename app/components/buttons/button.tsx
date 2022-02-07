import cn from 'classnames';
import Span, {SpanSizeEnum} from "../span";
import {ButtonProps} from "./button.props";
import styles from './button.module.scss'
import {ButtonTypes} from "./buttonTypes.enum";

export const Button = ({children, className, isDisabled, onClick, isFullSize, buttonRef, buttonType, ...props}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      onClick={onClick}
      ref={buttonRef}
      className={cn(styles.button, className, {
        [styles.primary]: buttonType === ButtonTypes.primary,
        [styles.error]: buttonType === ButtonTypes.error,
        [styles.success]: buttonType === ButtonTypes.success,
        [styles.transparent]: buttonType === ButtonTypes.transparent,
        [styles.white]: buttonType === ButtonTypes.white,
        [styles.black]: buttonType === ButtonTypes.black,
        [styles.fullSize]: isFullSize,
        [styles.disabled]: isDisabled
      })}
      disabled={isDisabled}
    >
      <Span size={SpanSizeEnum.medium}>{children}</Span>
    </button>
  )
}

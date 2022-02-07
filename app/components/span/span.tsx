import cn from 'classnames';
import {SpanSizeEnum, SpanProps} from "./span.props";
import styles from './span.module.scss'

export const Span = ({children, className, size, ...props}: SpanProps): JSX.Element => {
  return (
    <span {...props} className={cn(className, styles.spanTag, {
      [styles.small]: size === SpanSizeEnum.small,
      [styles.medium]: size === SpanSizeEnum.medium,
      [styles.large]: size === SpanSizeEnum.large,
    })}>
      {children}
    </span>
  )
}

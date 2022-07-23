import { CSSProperties } from 'react'

import classNames from 'classnames'

import styles from './Action.module.scss'
import { ActionProps } from './Action.types'

const Action = (actionProps: ActionProps) => {
  const { active, className, cursor, style, ...props } = actionProps
  const buttonStyle = {
    ...style,
    cursor,
    '--fill': active?.fill,
    '--background': active?.background,
  } as CSSProperties

  return (
    <button
      {...props}
      className={classNames(styles.action, className)}
      tabIndex={0}
      style={buttonStyle}
    />
  )
}

export default Action

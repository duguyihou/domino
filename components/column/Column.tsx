import React, { forwardRef } from 'react'

import classNames from 'classnames'

import { Handle, Remove } from '../common'
import styles from './Column.module.scss'
import { ColumnProps } from './Column.types'

const Column = forwardRef<HTMLDivElement | HTMLButtonElement, ColumnProps>(
  (columnProps: ColumnProps, ref) => {
    const {
      children,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    } = columnProps
    const Component = onClick ? 'button' : 'div'
    const componentClassName = classNames(
      styles.container,
      unstyled && styles.unstyled,
      horizontal && styles.horizontal,
      hover && styles.hover,
      placeholder && styles.placeholder,
      scrollable && styles.scrollable,
      shadow && styles.shadow
    )
    return (
      <Component
        {...props}
        ref={ref}
        style={style}
        className={componentClassName}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label && (
          <div className={styles.header}>
            {label}
            <div className={styles.actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        )}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    )
  }
)

Column.displayName = 'Column'
export default Column

import React, { forwardRef, CSSProperties } from 'react'

import classNames from 'classnames'

import { Handle, Remove } from '../common'
import styles from './Column.module.scss'
import { ColumnProps } from './Column.types'

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (columnProps: ColumnProps, ref) => {
    const {
      children,
      columns = 1,
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
    const componentStyle = {
      ...style,
      '--columns': columns,
    } as CSSProperties
    const componentClassName = classNames(
      styles.Container,
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
        style={componentStyle}
        className={componentClassName}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={styles.Header}>
            {label}
            <div className={styles.Actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    )
  }
)

Column.displayName = 'Column'
export default Column

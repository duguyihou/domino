import React, { forwardRef, LegacyRef } from 'react'

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
    const componentClassName = classNames(
      styles.container,
      unstyled && styles.unstyled,
      horizontal && styles.horizontal,
      hover && styles.hover,
      placeholder && styles.placeholder,
      scrollable && styles.scrollable,
      shadow && styles.shadow
    )
    if (onClick) {
      return (
        <button
          {...props}
          ref={ref as LegacyRef<HTMLButtonElement> | undefined}
          style={style}
          className={componentClassName}
          onClick={onClick}
          tabIndex={0}
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
        </button>
      )
    }
    return (
      <div
        {...props}
        ref={ref as LegacyRef<HTMLDivElement> | undefined}
        style={style}
        className={componentClassName}
        onClick={onClick}
        tabIndex={undefined}
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
      </div>
    )
  }
)

Column.displayName = 'Column'
export default Column

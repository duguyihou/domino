import React, { forwardRef } from 'react'

import classNames from 'classnames'

import { Handle, Remove } from '../common'
import styles from './Column.module.scss'
import { ColumnProps } from './Column.types'

const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (columnProps: ColumnProps, ref) => {
    const { children, handleProps, hover, onRemove, label, style } = columnProps
    const componentClassName = classNames(
      styles.container,
      hover && styles.hover
    )
    return (
      <div ref={ref} style={style} className={componentClassName}>
        {label && (
          <div className={styles.header}>
            {label}
            <div className={styles.actions}>
              {onRemove && (
                <Remove className={styles.remove} onClick={onRemove} />
              )}
              <Handle {...handleProps} />
            </div>
          </div>
        )}
        <ul>{children}</ul>
      </div>
    )
  }
)

Column.displayName = 'Column'
export default Column

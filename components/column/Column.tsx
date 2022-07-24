import React from 'react'

import classNames from 'classnames'

import { Handle, Remove } from '../common'
import styles from './Column.module.scss'
import { ColumnProps } from './Column.types'
import { useColumnDroppable } from './useColumnDroppable'

const Column = (columnProps: ColumnProps) => {
  const { droppableProps, children, onRemove, label } = columnProps
  const { setNodeRef, style, isOverColumn, attributes, listeners } =
    useColumnDroppable(droppableProps)
  const columnClassName = classNames(
    styles.container,
    isOverColumn && styles.hover
  )
  const handleProps = { ...attributes, ...listeners }
  return (
    <div ref={setNodeRef} style={style} className={columnClassName}>
      <div className={styles.header}>
        {label}
        <div className={styles.actions}>
          {onRemove && <Remove className={styles.remove} onClick={onRemove} />}
          <Handle {...handleProps} />
        </div>
      </div>
      <ul>{children}</ul>
    </div>
  )
}

export default Column

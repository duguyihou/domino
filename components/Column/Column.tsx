import React from 'react'

import { useDrop } from 'react-dnd'

import styles from './Column.module.scss'
import { ColumnProps } from './Column.types'

const Column = (columnProps: ColumnProps) => {
  const { children, title } = columnProps
  const dragObject = {
    accept: 'issue',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }
  const [{ isOver, canDrop }, drop] = useDrop(dragObject)
  const getBackgroundColor = () => {
    if (isOver) {
      return canDrop ? 'rgb(188,251,255)' : 'rgb(255,188,188)'
    }
  }
  return (
    <div
      ref={drop}
      className={styles.container}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  )
}

export default Column

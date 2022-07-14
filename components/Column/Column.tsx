import React from 'react'

import { useDrop } from 'react-dnd'

import { ColumnName } from '../../utils/constants'
import { ColumnProps } from './Column.types'

const Column = (columnProps: ColumnProps) => {
  const { children, title } = columnProps
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      const { currentColumnName } = item
      return (
        currentColumnName === title ||
        (currentColumnName === ColumnName.ToDo &&
          title === ColumnName.InProgress) ||
        (currentColumnName === ColumnName.InProgress &&
          (title === ColumnName.ToDo || title === ColumnName.AwaitingReview)) ||
        (currentColumnName === ColumnName.AwaitingReview &&
          (title === ColumnName.InProgress || title === ColumnName.Done)) ||
        (currentColumnName === ColumnName.Done &&
          title === ColumnName.AwaitingReview)
      )
    },
  })
  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'rgb(188,251,255)'
      } else if (!canDrop) {
        return 'rgb(255,188,188)'
      }
    } else {
      return ''
    }
  }
  return (
    <div ref={drop} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{title}</p>
      {children}
    </div>
  )
}

export default Column

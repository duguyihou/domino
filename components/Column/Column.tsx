import React from 'react'

import { useDrop } from 'react-dnd'

import { ColumnProps } from './Column.types'

const Column = (columnProps: ColumnProps) => {
  const { children, title } = columnProps
  const dragObject = {
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
        (currentColumnName === 'ToDo' && title === 'InProgress') ||
        (currentColumnName === 'InProgress' &&
          (title === 'ToDo' || title === 'AwaitingReview')) ||
        (currentColumnName === 'AwaitingReview' &&
          (title === 'InProgress' || title === 'Done')) ||
        (currentColumnName === 'Done' && title === 'AwaitingReview')
      )
    },
  }
  const [{ isOver, canDrop }, drop] = useDrop(dragObject)
  const getBackgroundColor = () => {
    if (isOver) {
      return canDrop ? 'rgb(188,251,255)' : 'rgb(255,188,188)'
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

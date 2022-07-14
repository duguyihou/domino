import React, { useRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import { ColumnName } from '../../utils/constants'
import { MovableCardProps } from './MovableCard.types'

const MovableCard = (movableCardProps: MovableCardProps) => {
  const { name, index, currentColumnName, moveCardHandler, setItems } =
    movableCardProps

  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => ({
        ...e,
        column: e.name === currentItem.name ? columnName : e.column,
      }))
    })
  }

  const ref = useRef<HTMLDivElement | null>(null)

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const { bottom, top } = ref.current.getBoundingClientRect()
      const hoverMiddleY = (bottom - top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset?.y - top
      if (
        (dragIndex < hoverIndex && hoverIndex < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      )
        return
      moveCardHandler(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName },
    type: 'Our first type',
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        const { name } = dropResult
        switch (name) {
          case ColumnName.InProgress:
            changeItemColumn(item, ColumnName.InProgress)
            break
          case ColumnName.AwaitingReview:
            changeItemColumn(item, ColumnName.AwaitingReview)
            break
          case ColumnName.Done:
            changeItemColumn(item, ColumnName.Done)
            break
          case ColumnName.ToDo:
            changeItemColumn(item, ColumnName.ToDo)
            break
          default:
            break
        }
      }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })
  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ opacity }}>
      {name}
    </div>
  )
}

export default MovableCard

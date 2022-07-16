import React, { useRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import { Issue } from '../../types'
import { CardProps } from './Card.types'

const Card = (cardProps: CardProps) => {
  const { name, index, currentColumnName, moveCardHandler, setItems } =
    cardProps
  const changeItemColumn = (currentItem: Issue, columnName: string) =>
    setItems((prevState) =>
      prevState.map((e) => ({
        ...e,
        column: e.name === currentItem.name ? columnName : e.column,
      }))
    )

  const ref = useRef<HTMLDivElement | null>(null)
  const dragObject = {
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
  }
  const [, drop] = useDrop(dragObject)

  const [{ isDragging }, drag] = useDrag({
    item: { index, name, currentColumnName },
    type: 'Our first type',
    end: (item: Issue, monitor) => {
      const dropResult = monitor.getDropResult<Issue>()
      if (!dropResult) return
      const { name } = dropResult
      changeItemColumn(item, name)
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

export default Card

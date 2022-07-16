import React, { useRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import { Issue } from '../../types'
import styles from './Card.module.scss'
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
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
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
    type: 'issue',
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
    <div ref={ref} className={styles.container} style={{ opacity }}>
      {name}
    </div>
  )
}

export default Card

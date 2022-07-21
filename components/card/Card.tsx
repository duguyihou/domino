import React, { useRef } from 'react'

import { faAlignLeft, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'

import { Issue } from '../../types'
import styles from './Card.module.scss'
import { CardProps, DropResult, HoverItem } from './Card.types'

const Card = (cardProps: CardProps) => {
  const { card, index, currentColumnName, moveCardHandler, setItems } =
    cardProps
  const changeItemColumn = (currentItem: Issue, columnName: string) => {
    setItems((prevState) => {
      const currState = prevState.map((item) => {
        const isChanged = item.card.title === currentItem.card.title
        const column = isChanged ? columnName : item.column
        return { ...item, column }
      })
      return currState
    })
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const dragObject = {
    accept: 'issue',
    hover(item: HoverItem, monitor: DragLayerMonitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const { bottom, top } = ref.current.getBoundingClientRect()
      const hoverMiddleY = (bottom - top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return
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
    item: { index, card, currentColumnName },
    type: 'issue',
    end: (item: Issue, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (!dropResult) return
      const { name } = dropResult
      changeItemColumn(item, name)
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })
  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))
  const { title, assignTo, hasDescription, newComments } = card
  const hasFooter = !!assignTo || hasDescription || newComments > 0
  return (
    <section ref={ref} className={styles.container} style={{ opacity }}>
      <p className={styles.title}>{title}</p>
      {hasFooter && (
        <footer className={styles.footer}>
          {hasDescription && <FontAwesomeIcon icon={faAlignLeft} />}
          {newComments > 0 && (
            <>
              <FontAwesomeIcon icon={faComment} />
              <p>{newComments}</p>
            </>
          )}
          {assignTo && <p className={styles.assignTo}>{assignTo}</p>}
        </footer>
      )}
    </section>
  )
}

export default Card

import React, { memo, CSSProperties } from 'react'

import classNames from 'classnames'

import styles from './Card.module.scss'
import { CardProps } from './Card.types'
import { useCardSortable } from './useCardSortable'

const Card = memo(({ card }: CardProps) => {
  const { id, label, priority, title, assignTo } = card
  const {
    setNodeRef,
    isDragging,
    isSorting,
    transition,
    transform,
    mountedWhileDragging,
    listeners,
  } = useCardSortable({ id: id as string })
  const wrapperClassName = classNames(
    styles.wrapper,
    mountedWhileDragging && styles.fadeIn,
    isSorting && styles.sorting
  )
  const wrapperStyle = {
    transition,
    '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
    '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
  } as CSSProperties

  const cardClassName = classNames(styles.card, isDragging && styles.dragging)
  return (
    <li className={wrapperClassName} style={wrapperStyle} ref={setNodeRef}>
      <div
        className={cardClassName}
        data-cypress="draggable-item"
        {...listeners}
      >
        <p className={styles.title}>{title}</p>
        <section className={styles.details}>
          <div className={styles.label}>{label}</div>
          <div className={styles.priority}>{priority}</div>
          <div className={styles.assignTo}>{assignTo}</div>
        </section>
      </div>
    </li>
  )
})
Card.displayName = 'Card'
export default Card

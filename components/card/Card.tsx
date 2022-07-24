import React, { memo, forwardRef, CSSProperties } from 'react'

import classNames from 'classnames'

import { Remove } from '../common'
import styles from './Card.module.scss'
import { CardProps } from './Card.types'

const Card = memo(
  forwardRef<HTMLLIElement, CardProps>((cardProps, ref) => {
    const {
      color,
      dragOverlay,
      dragging,
      disabled,
      fadeIn,
      index,
      listeners,
      onRemove,
      sorting,
      style,
      transition,
      transform,
      value,
      wrapperStyle,
      ...props
    } = cardProps

    const liClassName = classNames(
      styles.wrapper,
      fadeIn && styles.fadeIn,
      sorting && styles.sorting,
      dragOverlay && styles.dragOverlay
    )
    const liStyle = {
      ...wrapperStyle,
      transition,
      '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
      '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
      '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
      '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
      '--index': index,
      '--color': color,
    } as CSSProperties

    const divClassName = classNames(
      styles.item,
      dragging && styles.dragging,
      dragOverlay && styles.dragOverlay,
      disabled && styles.disabled,
      color && styles.color
    )
    return (
      <li className={liClassName} style={liStyle} ref={ref}>
        <div
          className={divClassName}
          style={style}
          data-cypress="draggable-item"
          {...listeners}
          {...props}
          tabIndex={0}
        >
          {value}
          <span className={styles.Actions}>
            {onRemove ? (
              <Remove className={styles.Remove} onClick={onRemove} />
            ) : null}
          </span>
        </div>
      </li>
    )
  })
)
Card.displayName = 'Card'
export default Card

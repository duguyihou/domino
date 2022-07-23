import React, { memo, forwardRef, CSSProperties } from 'react'

import classNames from 'classnames'

import { Handle, Remove } from '../common'
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
      handle,
      index,
      listeners,
      onRemove,
      renderItem,
      sorting,
      style,
      transition,
      transform,
      value,
      wrapperStyle,
      ...props
    } = cardProps
    const itemArgs = {
      dragOverlay: !!dragOverlay,
      dragging: !!dragging,
      sorting: !!sorting,
      index,
      fadeIn: !!fadeIn,
      listeners,
      ref,
      style,
      transform,
      transition,
      value,
    }
    const liClassName = classNames(
      styles.Wrapper,
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
      styles.Item,
      dragging && styles.dragging,
      handle && styles.withHandle,
      dragOverlay && styles.dragOverlay,
      disabled && styles.disabled,
      color && styles.color
    )
    return renderItem ? (
      renderItem(itemArgs)
    ) : (
      <li className={liClassName} style={liStyle} ref={ref}>
        <div
          className={divClassName}
          style={style}
          data-cypress="draggable-item"
          {...(!handle ? listeners : undefined)}
          {...props}
          tabIndex={!handle ? 0 : undefined}
        >
          {value}
          <span className={styles.Actions}>
            {onRemove ? (
              <Remove className={styles.Remove} onClick={onRemove} />
            ) : null}
            {handle ? <Handle {...listeners} /> : null}
          </span>
        </div>
      </li>
    )
  })
)
Card.displayName = 'Card'
export default Card

import React from 'react'

import { useDraggable } from '@dnd-kit/core'

import { DraggableProps } from './Draggable.types'

const Draggable = ({ children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  )
}

export default Draggable

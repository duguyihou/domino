import { useSortable } from '@dnd-kit/sortable'

import { useMountStatus } from '../../hooks'
import { Card } from '../card'
import { SortableCardProps } from './SortableCard.type'

function getColor(id: string) {
  switch (id[0]) {
    case 'A':
      return '#7193f1'
    case 'B':
      return '#ffda6c'
    case 'C':
      return '#00bcd4'
    case 'D':
      return '#ef769f'
  }

  return undefined
}

const SortableCard = (sortableCardProps: SortableCardProps) => {
  const { disabled, id, index, style, containerId, getIndex, items } =
    sortableCardProps
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted
  return (
    <Card
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id as string, items) : overIndex,
        containerId,
      })}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
    />
  )
}

export default SortableCard

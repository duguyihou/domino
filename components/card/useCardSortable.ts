import { useSortable } from '@dnd-kit/sortable'

import { useMountStatus } from '../../hooks'
import { CardSortableProps } from './Card.types'

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
export const useCardSortable = (cardSortableProps: CardSortableProps) => {
  const { id, style, getIndex, items, index, columnId } = cardSortableProps
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({ id })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted
  const cardStyle = style({
    index,
    value: id,
    isDragging,
    isSorting,
    overIndex: over ? getIndex(over.id as string, items) : overIndex,
    columnId,
  })
  return {
    setNodeRef,
    id,
    isDragging,
    isSorting,
    index,
    cardStyle,
    transition,
    transform,
    mountedWhileDragging,
    listeners,
    color: getColor(id),
  }
}

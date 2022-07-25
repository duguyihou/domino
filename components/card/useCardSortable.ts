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
export const useCardSortable = ({ id }: CardSortableProps) => {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    transform,
    transition,
  } = useSortable({ id })
  const mounted = useMountStatus()
  const mountedWhileDragging = isDragging && !mounted

  return {
    setNodeRef,
    id,
    isDragging,
    isSorting,
    transition,
    transform,
    mountedWhileDragging,
    listeners,
    color: getColor(id),
  }
}

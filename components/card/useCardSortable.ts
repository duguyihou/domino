import { useSortable } from '@dnd-kit/sortable'

import { useMountStatus } from '../../hooks'
import { CardSortableProps } from './Card.types'

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
  }
}

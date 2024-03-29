import { useSortable } from '@dnd-kit/sortable'

import { CardSortableProps } from './Card.types'
import { useMountStatus } from './useMountStatus'

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

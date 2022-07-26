import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import type { AnimateLayoutChanges } from '@dnd-kit/sortable'

import { ColumnDroppableProps } from './Column.types'

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true

export const useColumnDroppable = (
  columnDroppableProps: ColumnDroppableProps
) => {
  const { id, cards } = columnDroppableProps
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
  } = useSortable({
    id,
    data: {
      type: 'container',
    },
    animateLayoutChanges,
  })
  const cardIds = cards.map(({ id }) => id)
  const isOverColumn = over
    ? (id === over.id && active?.data.current?.type !== 'container') ||
      cardIds.includes(over.id)
    : false

  const style = {
    transition,
    opacity: isDragging ? 0.5 : undefined,
  }
  return {
    setNodeRef,
    style,
    isOverColumn,
    attributes,
    listeners,
  }
}

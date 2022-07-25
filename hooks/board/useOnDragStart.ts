import { Dispatch, SetStateAction } from 'react'

import type { DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'

import { Columns } from '../../types/board'

type OnDragStartArgs = {
  onDragStartArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setClonedItems: Dispatch<SetStateAction<Columns | null>>
    items: Columns
  }
}
export const useOnDragStart = ({ onDragStartArgs }: OnDragStartArgs) => {
  const { setActiveId, setClonedItems, items } = onDragStartArgs
  if (!setActiveId || !setClonedItems) return
  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    setClonedItems(items)
  }
  return onDragStart
}

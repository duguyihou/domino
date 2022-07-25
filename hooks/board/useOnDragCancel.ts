import { Dispatch, SetStateAction } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

import { Columns } from '../../types/board'

type OnDragCancelArgs = {
  onDragCancelArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setClonedItems: Dispatch<SetStateAction<Columns | null>>
    setItems: Dispatch<SetStateAction<Columns>>
    clonedItems: Columns | null
  }
}
export const useOnDragCancel = ({ onDragCancelArgs }: OnDragCancelArgs) => {
  const { setActiveId, setClonedItems, setItems, clonedItems } =
    onDragCancelArgs
  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }
  return onDragCancel
}

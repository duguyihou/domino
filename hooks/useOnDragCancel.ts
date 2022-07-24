import { Dispatch, SetStateAction } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

import { Cards } from '../types/board'

type OnDragCancelArgs = {
  onDragCancelArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setClonedItems: Dispatch<SetStateAction<Cards | null>>
    setItems: Dispatch<SetStateAction<Cards>>
    clonedItems: Cards | null
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

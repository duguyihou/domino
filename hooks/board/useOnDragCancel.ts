import { Dispatch, SetStateAction } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

import { Columns } from '../../types/board'

type OnDragCancelArgs = {
  onDragCancelArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setColumns: Dispatch<SetStateAction<Columns>>
    clonedColumns: Columns | null
    setClonedColumns: Dispatch<SetStateAction<Columns | null>>
  }
}
export const useOnDragCancel = ({ onDragCancelArgs }: OnDragCancelArgs) => {
  const { setActiveId, setClonedColumns, setColumns, clonedColumns } =
    onDragCancelArgs
  const onDragCancel = () => {
    if (clonedColumns) {
      setColumns(clonedColumns)
    }

    setActiveId(null)
    setClonedColumns(null)
  }
  return onDragCancel
}

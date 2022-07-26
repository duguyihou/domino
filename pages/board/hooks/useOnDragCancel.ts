import { Dispatch, SetStateAction } from 'react'

import type { UniqueIdentifier } from '@dnd-kit/core'

import { ColumnsDTO } from '../../../components/column'

type OnDragCancelArgs = {
  onDragCancelArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setColumns: Dispatch<SetStateAction<ColumnsDTO>>
    clonedColumns: ColumnsDTO | null
    setClonedColumns: Dispatch<SetStateAction<ColumnsDTO | null>>
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

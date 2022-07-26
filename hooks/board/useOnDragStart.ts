import { Dispatch, SetStateAction } from 'react'

import type { DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'

import { ColumnsDTO } from '../../components/column'

type OnDragStartArgs = {
  onDragStartArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setClonedColumns: Dispatch<SetStateAction<ColumnsDTO | null>>
    columns: ColumnsDTO
  }
}
export const useOnDragStart = ({ onDragStartArgs }: OnDragStartArgs) => {
  const { setActiveId, setClonedColumns, columns } = onDragStartArgs
  if (!setActiveId || !setClonedColumns) return
  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id)
    setClonedColumns(columns)
  }
  return onDragStart
}

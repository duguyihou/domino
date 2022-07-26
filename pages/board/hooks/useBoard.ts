import { useRef, useState } from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'

import { ColumnsDTO } from '../../../components/column'
import { useBoardSensors } from './useBoardSensors'
import { useOnDragCancel } from './useOnDragCancel'
import { useOnDragEnd } from './useOnDragEnd'
import { useOnDragOver } from './useOnDragOver'
import { useOnDragStart } from './useOnDragStart'

export const useBoard = (initialColumns: ColumnsDTO) => {
  const [columns, setColumns] = useState<ColumnsDTO>(initialColumns)
  const [columnNames, setColumnNames] = useState(Object.keys(columns))
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedColumns, setClonedColumns] = useState<ColumnsDTO | null>(null)
  const isSortingContainer = activeId
    ? columnNames.includes(activeId as string)
    : false
  const sensors = useBoardSensors()

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }
  // onDragStart
  const onDragStartArgs = { setActiveId, setClonedColumns, columns }
  const onDragStart = useOnDragStart({ onDragStartArgs })
  // onDragOver
  const onDragOverArgs = { columns, setColumns, recentlyMovedToNewContainer }
  const onDragOver = useOnDragOver({ onDragOverArgs })
  // onDragEnd
  const onDragEndArgs = { setActiveId, setColumnNames, columns, setColumns }
  const onDragEnd = useOnDragEnd({ onDragEndArgs })
  // onDragCancel
  const onDragCancelArgs = {
    setActiveId,
    setClonedColumns,
    setColumns,
    clonedColumns,
  }
  const onDragCancel = useOnDragCancel({ onDragCancelArgs })

  const dndContextConfig = {
    sensors,
    measuring,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
  }
  return {
    dndContextConfig,
    columnNames,
    columns,
    isSortingContainer,
  }
}

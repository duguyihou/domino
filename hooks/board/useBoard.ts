import { useRef, useState } from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'

import { Columns } from '../../types/board'
import { useBoardSensors } from './useBoardSensors'
import { useOnDragCancel } from './useOnDragCancel'
import { useOnDragEnd } from './useOnDragEnd'
import { useOnDragOver } from './useOnDragOver'
import { useOnDragStart } from './useOnDragStart'

export const useBoard = (initialColumns: Columns) => {
  const [items, setItems] = useState<Columns>(initialColumns)
  const [columnNames, setColumnNames] = useState(Object.keys(items))
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedItems, setClonedItems] = useState<Columns | null>(null)
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
  const onDragStartArgs = { setActiveId, setClonedItems, items }
  const onDragStart = useOnDragStart({ onDragStartArgs })
  // onDragOver
  const onDragOverArgs = { items, setItems, recentlyMovedToNewContainer }
  const onDragOver = useOnDragOver({ onDragOverArgs })
  // onDragEnd
  const onDragEndArgs = { setActiveId, setColumnNames, items, setItems }
  const onDragEnd = useOnDragEnd({ onDragEndArgs })
  // onDragCancel
  const onDragCancelArgs = {
    setActiveId,
    setClonedItems,
    setItems,
    clonedItems,
  }
  const onDragCancel = useOnDragCancel({ onDragCancelArgs })

  function handleRemove(containerID: UniqueIdentifier) {
    setColumnNames((columnNames) =>
      columnNames.filter((id) => id !== containerID)
    )
  }
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
    items,
    isSortingContainer,
    handleRemove,
  }
}

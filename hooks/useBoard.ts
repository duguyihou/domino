import { useRef, useState } from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'

import { Cards } from '../types/board'
import { getNextContainerId } from '../utils/getNextContainerId'
import { useBoardSensors } from './useBoardSensors'
import { useOnDragCancel } from './useOnDragCancel'
import { useOnDragEnd } from './useOnDragEnd'
import { useOnDragOver } from './useOnDragOver'
import { useOnDragStart } from './useOnDragStart'
export const TRASH_ID = 'void'

export const useBoard = (initialItems?: Cards) => {
  const [items, setItems] = useState<Cards>(
    initialItems ?? {
      A: ['A1', 'A2', 'A3'],
      B: ['B1', 'B2', 'B3'],
      C: ['C1', 'C2', 'C3'],
    }
  )
  const [columns, setColumns] = useState(Object.keys(items))
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedItems, setClonedItems] = useState<Cards | null>(null)
  const isSortingContainer = activeId
    ? columns.includes(activeId as string)
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
  const onDragEndArgs = { setActiveId, setColumns, items, setItems }
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
    setColumns((columns) => columns.filter((id) => id !== containerID))
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
    columns,
    items,
    isSortingContainer,
    getNextContainerId,
    handleRemove,
  }
}

import { useRef, useState } from 'react'

import { MeasuringStrategy } from '@dnd-kit/core'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { unstable_batchedUpdates } from 'react-dom'

import { Cards } from '../types/board'
import { getNextContainerId } from '../utils/getNextContainerId'
import { useBoardSensors } from './useBoardSensors'
import { useCollisionDetection } from './useCollisionDetection'
import { useOnDragCancel } from './useOnDragCancel'
import { useOnDragEnd } from './useOnDragEnd'
import { useOnDragOver } from './useOnDragOver'
import { useOnDragStart } from './useOnDragStart'
export const TRASH_ID = 'void'

export const useBoard = (initialItems: Cards) => {
  const [items, setItems] = useState<Cards>(
    initialItems ?? {
      A: ['A1', 'A2', 'A3'],
      B: ['B1', 'B2', 'B3'],
      C: ['C1', 'C2', 'C3'],
    }
  )
  const [containers, setContainers] = useState(Object.keys(items))
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedItems, setClonedItems] = useState<Cards | null>(null)
  const isSortingContainer = activeId
    ? containers.includes(activeId as string)
    : false
  const sensors = useBoardSensors()

  // collisionDetection
  const collisionDetectionArgs = {
    activeId,
    items,
    lastOverId,
    recentlyMovedToNewContainer,
  }
  const collisionDetection = useCollisionDetection({ collisionDetectionArgs })
  // measuring
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
  const onDragEndArgs = { setActiveId, setContainers, items, setItems }
  const onDragEnd = useOnDragEnd({ onDragEndArgs })
  // onDragCancel
  const onDragCancelArgs = {
    setActiveId,
    setClonedItems,
    setItems,
    clonedItems,
  }
  const onDragCancel = useOnDragCancel({ onDragCancelArgs })

  function handleAddColumn() {
    const newContainerId = getNextContainerId(items)

    unstable_batchedUpdates(() => {
      setContainers((containers) => [...containers, newContainerId])
      setItems((items) => ({
        ...items,
        [newContainerId]: [],
      }))
    })
  }

  function handleRemove(containerID: UniqueIdentifier) {
    setContainers((containers) => containers.filter((id) => id !== containerID))
  }
  const dndContextConfig = {
    sensors,
    collisionDetection,
    measuring,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
  }
  return {
    dndContextConfig,
    containers,
    items,
    isSortingContainer,
    getNextContainerId,
    handleAddColumn,
    handleRemove,
  }
}

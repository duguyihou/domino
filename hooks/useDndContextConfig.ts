import { useCallback, useRef, useState } from 'react'

import {
  closestCenter,
  rectIntersection,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
  MeasuringStrategy,
} from '@dnd-kit/core'
import type { CollisionDetection, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { unstable_batchedUpdates } from 'react-dom'

import { Cards } from '../types/board'
export const TRASH_ID = 'void'
const PLACEHOLDER_ID = 'placeholder'
const defaultInitializer = (index: number) => index
const createRange = (
  length: number,
  initializer: (index: number) => any = defaultInitializer
) => {
  return [...new Array(length)].map((_, index) => initializer(index))
}
export const useDndContextConfig = (initialItems, itemCount, modifiers) => {
  const [items, setItems] = useState<Cards>(
    () =>
      initialItems ?? {
        A: createRange(itemCount, (index) => `A${index + 1}`),
        B: createRange(itemCount, (index) => `B${index + 1}`),
        C: createRange(itemCount, (index) => `C${index + 1}`),
        D: createRange(itemCount, (index) => `D${index + 1}`),
      }
  )
  const [containers, setContainers] = useState(Object.keys(items))
  const [activeId, setActiveId] = useState<string | null>(null)
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  const [clonedItems, setClonedItems] = useState<Cards | null>(null)
  const isSortingContainer = activeId ? containers.includes(activeId) : false
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const findContainer = (id: string) => {
    if (id in items) return id
    return Object.keys(items).find((key) => items[key].includes(id))
  }
  const getIndex = (id: string) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = items[container].indexOf(id)

    return index
  }
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      let overId = rectIntersection(args)

      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        })
      }

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })
          }
        }

        lastOverId.current = overId

        return overId
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }
      return lastOverId.current
    },
    [activeId, items]
  )
  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }
  const onDragStart = ({ active }) => {
    setActiveId(active.id)
    setClonedItems(items)
  }
  const onDragOver = ({ active, over }) => {
    const overId = over?.id
    if (!overId || active.id in items) return

    const overContainer = findContainer(overId)
    const activeContainer = findContainer(active.id)

    if (!overContainer || !activeContainer) return

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer]
        const overItems = items[overContainer]
        const overIndex = overItems.indexOf(overId)
        const activeIndex = activeItems.indexOf(active.id)

        let newIndex: number

        if (overId in items) {
          newIndex = overItems.length + 1
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.offsetTop >
              over.rect.offsetTop + over.rect.height

          const modifier = isBelowOverItem ? 1 : 0

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1
        }

        recentlyMovedToNewContainer.current = true

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        }
      })
    }
  }
  function getNextContainerId() {
    const containeIds = Object.keys(items)
    const lastContaineId = containeIds[containeIds.length - 1]

    return String.fromCharCode(lastContaineId.charCodeAt(0) + 1)
  }
  const onDragEnd = ({ active, over }) => {
    if (active.id in items && over?.id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.id)
        const overIndex = containers.indexOf(over.id)

        return arrayMove(containers, activeIndex, overIndex)
      })
    }

    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (!overId) {
      setActiveId(null)
      return
    }

    if (overId === PLACEHOLDER_ID) {
      const newContainerId = getNextContainerId()

      unstable_batchedUpdates(() => {
        setContainers((containers) => [...containers, newContainerId])
        setItems((items) => ({
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (id) => id !== activeId
          ),
          [newContainerId]: [active.id],
        }))
        setActiveId(null)
      })
      return
    }

    const overContainer = findContainer(overId)

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id)
      const overIndex = items[overContainer].indexOf(overId)

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }))
      }
    }

    setActiveId(null)
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems)
    }

    setActiveId(null)
    setClonedItems(null)
  }
  function handleAddColumn() {
    const newContainerId = getNextContainerId()

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
    collisionDetection: collisionDetectionStrategy,
    measuring,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
    modifiers,
  }
  return {
    dndContextConfig,
    containers,
    items,
    isSortingContainer,
    getIndex,
    getNextContainerId,
    handleAddColumn,
    handleRemove,
  }
}

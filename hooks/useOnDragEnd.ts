import { Dispatch, SetStateAction } from 'react'

import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { unstable_batchedUpdates } from 'react-dom'

import { Cards } from '../types/board'
import { findContainer } from '../utils/findContainer'
import { getNextContainerId } from '../utils/getNextContainerId'

type OnDragEndArgs = {
  onDragEndArgs: {
    setActiveId: Dispatch<SetStateAction<UniqueIdentifier | null>>
    setContainers: Dispatch<SetStateAction<string[]>>
    setItems: Dispatch<SetStateAction<Cards>>
    items: Cards
  }
}

const PLACEHOLDER_ID = 'placeholder'
export const useOnDragEnd = ({ onDragEndArgs }: OnDragEndArgs) => {
  const { setActiveId, setContainers, items, setItems } = onDragEndArgs

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!items) return
    if (active.id in items && over?.id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.id as string)
        const overIndex = containers.indexOf(over.id as string)

        return arrayMove(containers, activeIndex, overIndex)
      })
    }

    const activeContainer = findContainer(active.id, items)

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
      const newContainerId = getNextContainerId(items)

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

    const overContainer = findContainer(overId, items)

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id as string)
      const overIndex = items[overContainer].indexOf(overId as string)

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
  return onDragEnd
}
